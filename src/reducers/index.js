import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import adminProduct from './admin_product';
import store from './store';
import reducerResponseState from './respons';
import user from './user';
import cart from './cart';


export default combineReducers({
  adminProduct,
  store,
  user,
  cart,
  response: reducerResponseState,
  form: formReducer,
});
