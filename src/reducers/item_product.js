import {
  SET_ITEM_PRODUCT,
  SET_LOADING
} from '../constants/';

const initState = {
  loading: true,
  itemProduct: {},
};

const reducerItemProduct = (state = initState, action)  => {
  switch (action.type) {
    case SET_ITEM_PRODUCT:          return { ...state, itemProduct: action.itemProduct };
    case SET_LOADING:               return { ...state, loading: action.loading };

    default:                        return state;
  }
};

export default reducerItemProduct;