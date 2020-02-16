import { combineReducers } from 'redux';

import itemProduct from './item_product';
import searchProductList from './search_product_list';

export default combineReducers({
  itemProduct,
  searchProductList,
});
