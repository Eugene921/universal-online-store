import React from "react";
import { Link } from "react-router-dom";

import initState from '../../initial_state';

import StoreItemShort from './store_item_short'

export default function Store() {
  return (
    <div>
      <h2><Link to='/store'>Store</Link></h2>
      <div className="store"> 
        {
          initState.store.map(item => <StoreItemShort item={item} key={item.name} />)
        }
      </div>
    </div>
  )
}