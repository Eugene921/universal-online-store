import {
  SET_ITEM_PRODUCT,
  SET_LOADING_ITEM_PRODUCT
} from '../constants/';

const initState = {
  loading: true,
  itemProduct: {
      name: '',
      images: [],
      details: '',
      sizes: [],
      colors: [],
      costPerItem: 0,
      link: '',
  },
};

const reducerItemProduct = (state = initState, action)  => {
  console.log(action);
  switch (action.type) {
    case SET_ITEM_PRODUCT:          return { ...state, itemProduct: action.itemProduct };
    case SET_LOADING_ITEM_PRODUCT:  return { ...state, loading: action.loading };

    default:                        return state;
  }
};

export default reducerItemProduct;