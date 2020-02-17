import { combineReducers } from 'redux';

import itemProduct from './item_product';
import searchProductList from './search_product_list';
import {reducer as formReducer} from 'redux-form';


export default combineReducers({
  itemProduct,
  searchProductList,
  form: formReducer,
});
