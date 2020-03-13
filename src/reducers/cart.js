import { ADD_PRODUCT_TO_CART, DELETE_PRODUCT_FROM_CART, SET_CART, SET_PRODUCT_QUANTITY_IN_CART } from '../constants';

// case GET_CART_FROM_LOCALSTORAGE: return state;
// case SET_CART_TO_LOCALSTORAGE: return state;

const cart = (state = [], action)  => {
  switch (action.type) {
    case SET_CART: return action.cart;

    case ADD_PRODUCT_TO_CART:         return [...state, { ...action.product, quantity: action.quantity || 1 }];
    case SET_PRODUCT_QUANTITY_IN_CART: {
      return state.map(product => product !== action.link ? product : { ...product, quantity: action.quantity });
    }

    case DELETE_PRODUCT_FROM_CART:      return state.filter(product => product.link !== action.link);

    default:                  return state;
  }
};

export default cart;