import React from "react";
import { Link } from "react-router-dom";

import initState from '../../../initial_state';

import ColorsBar from './colors_bar';
import SizesBar from './sizes_bar';
import QuantityСounter from './quantity_counter';

export default function StoreItemFull(props) {
  const productLink = props.match.params.product;

  const product = initState.store.filter(product => product.link === productLink)[0];
  
  return (
    <div className='store_item_full'>
      <div>
        <img src={product.images[0]} alt="" />
      </div>

      <div>
        <Link to='/store'>Back to Store</Link>
        <br/>
        <h2>{product.name}</h2>
        <br/>
        <p>{product.details}</p>
        <br/>
        <ColorsBar colors={product.colors} />
        <br/>
        <SizesBar sizes={product.sizes} />
        <br/>
        <QuantityСounter/>
        <br/>
        <p className="store_item_full_cost">TOTAL (PER ITEM): {product.costPerItem}</p>
        <button className="store_item_add_to_card">add to card</button>
      </div>
    </div>
  )
}