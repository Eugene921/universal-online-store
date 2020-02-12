import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import initState from '../../../initial_state';

import ColorsBar from './colors_bar';
import SizesBar from './sizes_bar';
import QuantityСounter from './quantity_counter';

import SliderForProduct from '../../slider/slider_for_product';

class StoreItemFull extends React.Component {
  constructor(props) {
    super(props);
    const storeItemLink = props.match.params.product;

    const storeItem = initState.store.find(product => product.link === storeItemLink);

    this.state = {
      name: storeItem.name,
      images: storeItem.images,
      details: storeItem.details,
      sizes: storeItem.sizes,
      colors: storeItem.colors,
      costPerItem: storeItem.costPerItem,
      link: storeItem.link,
      quantity: 1,
      selectColorIndex: null,
      selectSizeIndex: null,
    };

    this.onChangeSelectColorIndex = this.onChangeSelectColorIndex.bind(this);
    this.onChangeSelectSizeIndex = this.onChangeSelectSizeIndex.bind(this);
  }

  onChangeQuantity(quantity) {
    this.setState({ quantity: quantity < 1 ? 1 : quantity});
  }

  onChangeSelectColorIndex(selectColorIndex) {
    this.setState({ selectColorIndex: selectColorIndex});
  }


  onChangeSelectSizeIndex(selectSizeIndex) {
    this.setState({ selectSizeIndex: selectSizeIndex});
  }

  render() {
    const { quantity,images, name, details, colors, sizes, costPerItem, selectColorIndex, selectSizeIndex } = this.state;

    return (
      <div className='store_item_full'>
        <div>
          <SliderForProduct
            images={images}
            className="slider_for_user"
            width={window.innerWidth / 100 * 60}
            height={window.innerHeight}
          />
        </div>
  
        <div>
          <Link className="btn_back_to_store" to='/store'>Back to Store</Link>
          <h2 className="product_name">{name}</h2>
          <p className="product_details">{details}</p>
          <div className="product_color">
            <span>Product Color:</span>
            <ColorsBar
              onChangeSelectColorIndex={this.onChangeSelectColorIndex}
              colors={colors}
              selectColorIndex={selectColorIndex}
            />
          </div>
          <div className="product_size">
            <span>Product Size:</span>
            <SizesBar
              sizes={sizes}
              selectSizeIndex={selectSizeIndex}
              onChangeSelectSizeIndex={this.onChangeSelectSizeIndex}
            />
          </div>
          <QuantityСounter
            onAdd={() => this.onChangeQuantity(quantity + 1)}
            onRemove={() => this.onChangeQuantity(quantity - 1)}
            quantity={quantity}
          />
          <p className="store_item_full_cost">TOTAL (PER ITEM): {costPerItem}</p>
          <button className="store_item_add_to_card">add to card</button>
        </div>
      </div>
    );
  }
}

StoreItemFull.propTypes = {
  match: PropTypes.any,
};

export default StoreItemFull;