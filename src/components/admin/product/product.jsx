import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset, SubmissionError } from 'redux-form';


import * as base from '../../../../data_base/api_of_base';

import { getProduct, postProduct, setLoadingProduct } from '../../../actions';

import ProductForAdminForm from './form';

class ProductForAdmin extends React.Component {
  constructor(props) {
    super(props);
    const { productLink } = props.computedMatch.params;
    this.props.getInitialValues(productLink);
    
    this.state = {
      slidePosition: 0,
      link: {
        value: '',
        isUsed: false,
      }
    };

    this.warning = this.warning.bind(this);
    this.validate = this.validate.bind(this);
    this.asyncValidate = this.asyncValidate.bind(this);
    this.hendleSubmit = this.hendleSubmit.bind(this);
  }

  warning(values) {
    console.log(values);
    const warnings = {};
      // Walidate of price cost
      if (Number(values.costPerItem) === 0 || values.costPerItem === '') {
        warnings.costPerItem = 'Are you sure is it right price?';
      }

      // walidate of array colors 
      if(values.colors) {
        if (!values.colors.length) {
          warnings.colors = { _warning: 'Are you sure you haven\'t colors?' };
        } else {
          const colorArrayWarning = [];

          values.colors.forEach((color, index) => {
            if (!color || !color.length) colorArrayWarning[index] = 'Empty field is not saved';
          });

          if (colorArrayWarning.length) warnings.colors = colorArrayWarning;
        }
      }

      // walidate of array sizes 
      if(values.sizes) {
        if (!values.sizes.length) {
          warnings.sizes = { _warning: 'Are you sure you haven\'t sizes?' };
        } else {
          const sizesArrayWarning = [];

          values.sizes.forEach((size, index) => {
            if (!size || !size.length) sizesArrayWarning[index] = 'Empty field is not saved';
          });

          if (sizesArrayWarning.length) warnings.sizes = sizesArrayWarning;
        }
      }

      // walidate of textarea
      if(!values.details || !values.details.length) {
        warnings.details = 'Your product details is empty';
      }

      // list images
      if(!values.images || !values.images.length ) {
        warnings.images = { _warning: 'List of images is empty'};
      }
      
      console.log('ProductForAdmin -> warning -> warnings', warnings);
      return warnings;
  }

  async asyncValidate(values) {
    if(typeof values.link === 'string') {
      const { checkOfCreateNew } = this.props.adminProduct;

      if(checkOfCreateNew) {
        const { link } = this.state;
  
        if (values.link !== link.value) {
          const linkIsMatch = await base.dbCheckLinkIsMatch(values.link);
  
          if(linkIsMatch) {
            this.setState({ link: { value: values.link, isUsed: true } });
            throw { link: 'Link already taken' };
          } else {
            this.setState({ link: { value: values.link, isUsed: false } });
          }
        } else{
          if (link.isUsed) throw { link: 'Link already taken' };
        }
      }
    }

    return null;
  }

  validate (values) {
    const { checkOfCreateNew } = this.props.adminProduct;

    const errors = {};
    if(checkOfCreateNew) {
      if (!values.link || !values.link.length) {
        errors.link = 'Required';
      } else if (values.link.length < 3) {
        errors.link = 'Link too short';
      } else if (!/^[a-z0-9_-]{3,}$/i.test(values.link)) {
        errors.link = 'Link invalid characters used. Can used "a-z A-Z 0-9 - _"';
      }
    }
  
    if (!values.name || !values.name.length) {
      errors.name = 'Required';
    } else if (values.name.length < 3) {
      errors.name = 'Name too short';
    }
  
    if (isNaN(Number(values.costPerItem))) {
      errors.costPerItem = 'Must be a number';
    }

    if(!this.state.warningHasBeenShown) {
      errors.warningHasBeenShown = { _error: 'warning not showed' };
      this.setState({ warningHasBeenShown: true });
    }

    return errors;
  }

  async hendleSubmit(data) {
    const arrayMatch = data.images.map(imageForMatch => {
      const arr = data.images.filter(image => {
        return imageForMatch.name === image.name;
      });
      return arr.length > 1 ? true : false;
    });

    if (arrayMatch.some(item => item === true)) {
      const imageArrayErrors = [];

      arrayMatch.forEach((item, i) => {
        if(item) imageArrayErrors[i] = 'Image names must be unique';
      });

      if(imageArrayErrors.length) {
        throw new SubmissionError({
          images: imageArrayErrors,
        });
      }
    } else {

      const { adminProduct: { checkOfCreateNew }, postProduct } = this.props;
      const product = {
        link: data.link,
        name: data.name,
        details: data.details,
        costPerItem: data.costPerItem,
        colors: data.colors,
        sizes: data.sizes,
        images: data.images,
      };
      
      if( checkOfCreateNew ) product.images = product.images.filter(image => !image.delete),
      product.images.map((item, i) => delete product.images[i].delete);
      
      await postProduct(product);
    }
  }

  render(){
    const { slidePosition } = this.state;
    const { adminProduct, images } = this.props;
    const { loading, checkOfCreateNew, product } = adminProduct;

    return (
      <div className={ loading ? 'loading' : '' }>
        <ProductForAdminForm
          onSubmit={this.hendleSubmit}
          getSlidePosition={position => this.setState({ slidePosition: position })}
          slidePosition={slidePosition}
          images={images}
          checkOfCreateNew={checkOfCreateNew}
          initialValues={product}
          warn={this.warning}
          validate={this.validate}
          asyncValidate={this.asyncValidate}
          asyncBlurFields={['link']}
        />
      </div>
    );
  }
}

ProductForAdmin.propTypes = {
  computedMatch: PropTypes.any,
  getInitialValues: PropTypes.func,
  postProduct: PropTypes.func,
  reset: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  loading: PropTypes.bool,
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    path: PropTypes.string,
    name: PropTypes.string,
    delete: PropTypes.bool,
  })),
  adminProduct: PropTypes.object,
  fieldsData: PropTypes.object,
  handleSubmit: PropTypes.func,
  checkOfCreateNew: PropTypes.bool,
  linkIsMacth: PropTypes.bool,
  setLoading: PropTypes.func,
  state: PropTypes.any,
};

const mapStateToProps = (state) => ({
  adminProduct: state.adminProduct,
});

const mapDispatchToProps = (dispatch) => ({
  getInitialValues: link => dispatch(getProduct(link)),
  postProduct: product => dispatch(postProduct(product)),
  setLoading: loading => dispatch(setLoadingProduct(loading)),
  reset: () => dispatch(reset('adminFormProduct')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductForAdmin);
