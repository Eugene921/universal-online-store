import React from 'react';

import initState from '../../initial_state';

import StoreItemShort from './store_item_short';

export default function Store() {
  return (
    <div className="store"> 
      {
        initState.store.map(item => <StoreItemShort item={item} key={item.link} />)
      }
    </div>
  );
}