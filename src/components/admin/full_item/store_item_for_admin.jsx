import React from 'react';
import { withRouter } from 'react-router-dom';
// import { Field, reduxForm } from 'redux-form';

import CastomInput from './castom_input';
import CastomTextArea from './castom_textarea';
import SelectToArr from './select_to_arr';
import ImagesInput from './images_input';
import SliderForProduct from '../../slider/slider_for_product';

import PropTypes from 'prop-types';

// import { getStoreItem } from '../../../initial_state';

// import { setItemProduct } from '../../../base/base_product';

class SotoreItemForAdmin extends React.Component {
  static imagesIsMatch(arrImage) {
    return arrImage.some(imageForMatch => {
      const arr = arrImage.filter(image => {
        // if(imageForMatch.path === image.path ) return true;
        if(imageForMatch.name === image.name ) return true;
        return false;
      });
      return arr.length > 1;
    });
  }

  constructor(props) {
    super(props);
    const { productLink } = props.match.params;

    this.state = {
      loading: true,
      slidePosition: 0,
    };

    this.onReset = this.onReset.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddSize = this.onAddSize.bind(this);
    this.checkValueSizes = this.checkValueSizes.bind(this);
    this.onAddColor = this.onAddColor.bind(this);
    this.checkValueColors = this.checkValueColors.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);
    this.onChangeImagesName = this.onChangeImagesName.bind(this);
    this.fileSelectedHendler = this.fileSelectedHendler.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLink = this.onChangeLink.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);
    this.onChangeDetails = this.onChangeDetails.bind(this);

    this.props.getItemProduct(productLink);
  }

  // async getItemProduct() {
  //   const { link } = this.state;
    
  //   const itemProduct = await getItemProduct(link);

  //   if(itemProduct !== null) {
  //     const productImages = await getUrlProductImages(itemProduct.images);

  //     this.setState({
  //       name: itemProduct.name || '',
  //       details: itemProduct.details || '',
  //       images: productImages || [],
  //       sizes: itemProduct.sizes || [],
  //       colors: itemProduct.colors || [],
  //       costPerItem: itemProduct.costPerItem || 0,
  //       loading1: false,
  //     });
  //   }
  // }

  setLoading(status) {
    this.setState({ loading1: status });
  }

  onChangeDetails(details) {
    this.setState({ details: details });
  }

  onChangeName(name) {
    this.setState({ name: name });
  }

  onChangeLink(link) {
    this.setState({ link: link });
  }

  onChangeCost(cost) {
    this.setState({ costPerItem: cost });
  }

  onAddSize(event) {
    event.preventDefault();
    const { sizes } = this.state;

    this.setState({
      sizes: [...sizes, ''],
    });
  }

  checkValueSizes(index) {
    const { sizes } = this.state;
    const { value } = event.target;

    if(value.length) {

      this.setState({
        sizes: sizes.map((size, i) => i === index ? value : size),
      });
    } else {  
       
      this.setState({
        sizes: sizes.filter((size, i) => i !== index),
      });
    }
  }

  onAddColor(event) {
    event.preventDefault();
    const { colors } = this.state;

    this.setState({
      colors: [...colors, ''],
    });
  }

  checkValueColors(indexUi) {
    const { colors } = this.state;
    const { value } = event.target;

    if(value.length) {

      this.setState({
        colors: colors.map((color, index) => index === indexUi ? value : color),
      });
    } else {  
       
      this.setState({
        colors: colors.filter((color, index) => index !== indexUi),
      });
    }
  }

  onRemoveImage(index) {
    const { images } = this.state;

    this.setState({
      images: images.map((image, i) => i !== index ? image : {...image, delete: true})
    });
  }

  onChangeImagesName(index, name) {
    const { images } = this.state;
    
    this.setState({
      images: images.map((image, i) => i !== index ? image : { ...image, name: name}),
    });
  }

  onSubmit(e) {
    e.preventDefault();
    // const { name, images, details, sizes, colors, costPerItem, link, } = this.state;

    // if(SotoreItemForAdmin.imagesIsMatch(images)) return alert('URL and name images must not match');

    // setItemProduct({
    //   name: name,
    //   images: images,
    //   details: details,
    //   sizes: sizes,
    //   colors: colors,
    //   costPerItem: costPerItem,
    //   link: link,
    //   slidePosition: 0,
    // });
  }

  onReset(e) {
    e.preventDefault();
    this.getItemProduct();
  }

   
  fileSelectedHendler(e) {
    if(e.target.files[0] === undefined) return;
    const { images } = this.state;

    const blob = new Blob([e.target.files[0]],  { type: e.target.files[0].type });

    const newImage = {
      url: URL.createObjectURL(blob),
      name: e.target.files[0].name,
      type: e.target.files[0].type,
      path: ''
    };

    this.setState({
      images: [ ...images, newImage],
    });
  }

  // componentDidMount() {
  //   if(this.state.loading) this.setState({ loading: false });
  // }

  render(){
    const { slidePosition } = this.state;
    const { itemProduct, loading } = this.props.itemProduct;

    const { link, name, details, costPerItem, sizes, colors, images } = itemProduct;

    const imagesForSlider = images.filter(image => !image.delete);

  console.log(this.props);
  
    
    return (
      <div className={loading ? 'loading' : ''}>
        <form className="item_full_for_admin" onSubmit={this.onSubmit} onReset={this.onReset}>
          <div className="item_full_images_for_admin">
            <ImagesInput
              images={imagesForSlider}
              onRemoveItem={this.onRemoveImage}
              changeName={this.onChangeImagesName}
              fileSelectedHendler={this.fileSelectedHendler}
              slidePosition={slidePosition}
            />
            <SliderForProduct
              getSlidePosition={slidePosition => this.setState({ slidePosition: slidePosition })}
              setSlidePosition={slidePosition}
              images={imagesForSlider}
              className="slider_for_admin"
              width={window.innerWidth / 100 * 40 > 600 ? 400 : window.innerWidth / 100 * 40}
              height={window.innerHeight / 100 * 70}
            />
          </div>
          <div className="item_full_data_for_admin">
            <CastomInput name='Link' value={link} onChange={this.onChangeLink} />
            <CastomInput name='Name' value={name} onChange={this.onChangeName} />
            <CastomTextArea name='Details' value={details} onChange={this.onChangeDetails} />
            <CastomInput name='Cost per item' value={costPerItem} onChange={this.onChangeCost} />
            <SelectToArr name='Sizes' arr={sizes} onAddItem={this.onAddSize} checkValue={this.checkValueSizes} />
            <SelectToArr name='Colors' arr={colors} onAddItem={this.onAddColor} checkValue={this.checkValueColors} />
            <button type="submit" className="btn_seve_cheang btn">Save</button>
            <button type="reset" className="btn_cencel_cheang btn">Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

SotoreItemForAdmin.propTypes = {
  match: PropTypes.any,
  getItemProduct: PropTypes.func,
  itemProduct: PropTypes.shape({
    itemProduct: PropTypes.object,
    loading: PropTypes.bool,
  })
};

// export const adminFormProduct = reduxForm({ form: 'adminFormProduct' })(SotoreItemForAdmin);

export default withRouter(SotoreItemForAdmin);