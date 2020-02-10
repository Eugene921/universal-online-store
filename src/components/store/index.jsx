import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import Store from './store';
import StoreItemFull from './full_item/store_item_full';

export default function AppStore() {
  return (
    <Switch>
      <Route exact path='/store' component={Store}/>
      <Route path='/store/:product' component={StoreItemFull}/>
    </Switch>
  );
}