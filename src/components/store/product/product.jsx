import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import returnSVG from '../../../../public/images/return.svg';

import ArrayCheckbox from '../array_checkbox';
import QuantityСounter from './quantity_counter';
import { getObservableProduct, unsetObservableProduct, selectProductParameter, redirectIsPassed } from '../../../actions';

import SliderForProduct from '../../slider/slider_for_product';

class Product extends React.Component {
  constructor(props) {
    super(props);
    const link = props.match.params.productLink;

    this.state = {
      quantity: 1,
    };

    this.props.getObservableProduct(link);
  }

  onChangeQuantity(quantity) {
    this.setState({ quantity: quantity < 1 ? 1 : quantity});
  }

  componentWillUnmount(){
    const { unsetObservableProduct } = this.props;
    unsetObservableProduct();
  }

  render() {
    const { loading, observableProduct, redirect, selectProductParameter, redirectIsPassed } = this.props;
    console.log('Product -> render -> loading', loading);
    const { quantity } = this.state;

    if(redirect) {
      redirectIsPassed();
      return <Redirect to={redirect} />;
    }
    
    const { images, details, name, costPerItem, colors, selectIndexColor, sizes, selectIndexSize, link } = observableProduct ? observableProduct : {};
    console.log('Product -> render -> observableProduct', observableProduct);

    return (
      <div className={`store_item_full ${loading && 'loading'}`}>
        <div>
          <SliderForProduct
            getSlidePosition={index => console.log(index)}
            setSlidePosition={0}
            images={images ? images : []}
            className="slider_for_user"
            width={window.innerWidth / 100 * 58}
            height={window.innerHeight / 100 * 90}
          />
        </div>
        <div>
          <Link className="btn_back_to_store" to='/store'><img src={returnSVG}/> Back to Store</Link>
          <h2 className="product_name">{name && name}</h2>
          <p className="product_details">{details && details}</p>
          {colors && <div className="product_color">
            <span>Product Color:</span>
            <ArrayCheckbox
              array={colors}
              onChangeSelectIndex={index => selectProductParameter(link, 'selectIndexColor', index)}
              selectIndex={selectIndexColor || 0}
              type="colors"
            />
          </div>}
          { sizes && 
            <div className="product_size">
              <span>Product Size:</span>
              <ArrayCheckbox
                array={sizes}
                onChangeSelectIndex={index => selectProductParameter(link, 'selectIndexSize', index)}
                selectIndex={selectIndexSize || 0}
                type="sizes"
              />
            </div>
          }
          <QuantityСounter
            onAdd={() => this.onChangeQuantity(quantity + 1)}
            onRemove={() => this.onChangeQuantity(quantity - 1)}
            quantity={quantity}
          />

          <p className="store_item_full_cost">TOTAL PRICE: {<span>{isNaN(costPerItem * quantity) ? '' : costPerItem * quantity}</span>}</p>
          <button className="store_item_add_to_card">ADD TO CARD</button>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  loading: PropTypes.bool,
  match: PropTypes.any,
  getObservableProduct: PropTypes.func,
  selectProductParameter: PropTypes.func,
  redirectIsPassed: PropTypes.func,
  unsetObservableProduct: PropTypes.func,
  observableProduct: PropTypes.object,
  redirect: PropTypes.any,
};



const mapStateToProps = store => ({
  observableProduct: store.store.observableProduct,
  redirect: store.response.redirect,
  loading: store.store.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getObservableProduct: link => dispatch(getObservableProduct(link)),
  selectProductParameter: (link, parameter, index) => dispatch(selectProductParameter(link, parameter, index)),
  unsetObservableProduct: () => dispatch(unsetObservableProduct()),
  redirectIsPassed: () => dispatch(redirectIsPassed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);