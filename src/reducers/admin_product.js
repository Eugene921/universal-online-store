import {
  SET_PRODUCT,
  SET_LOADING_PRODUCT,
} from '../constants';

const initStateProduct = {
  name: '',
  images: [],
  details: '',
  sizes: [],
  colors: [],
  costPerItem: '',
  link: '',
};

const initState = {
  loading: true,
  checkOfCreateNew: false,
  product: initStateProduct,
};

const reducerAdminProduct = (state = initState, action)  => {
  switch (action.type) {
    case SET_PRODUCT: {
      const product = action.product !== null ? action.product : initStateProduct;
      const checkOfCreateNew = action.product === null;
      
      return {...state, product, checkOfCreateNew, };
    }
    case SET_LOADING_PRODUCT:    return { ...state, loading: action.loading };

    default:                     return state;
  }
};

export default reducerAdminProduct;