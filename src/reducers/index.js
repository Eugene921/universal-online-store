import { combineReducers } from 'redux';

import productItem from './product_item';
import searchProductList from './search_product_list';

export default combineReducers({
  productItem,
  searchProductList,
});
