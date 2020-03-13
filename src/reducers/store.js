import {
  SET_SHORT_LIST_PRODUCT,
  SET_LOADING_STORE,
  DELETE_PRODUCT,
  SELECT_PRODUCT_PARAMETER,
  SET_OBSERVABLE_PRODUCT,
  UNSET_OBSERVABLE_PRODUCT,
} from '../constants';

const initState = {
  listProducts: [],
  observableProduct: null,
  loading: true,
};

const store = (state = initState, action)  => {
  switch (action.type) {
    case SET_SHORT_LIST_PRODUCT: {
      return { ...state, listProducts: action.listProducts.map(product => ({ ...product, selectIndexColor: 0, selectIndexSize: 0 })) };
    }
    case SET_LOADING_STORE:  return {...state, loading: action.loading };
    case DELETE_PRODUCT: {
      const { listProducts } = state;
      return {...state, listProducts: listProducts.filter(product => product.link !== action.link)};
    }

    case SELECT_PRODUCT_PARAMETER: {
      if(state.observableProduct && action.link === state.observableProduct.link) {
        return { ...state, observableProduct:  { ...state.observableProduct, [action.parameter]: action.index }};
      } else {
        const listProducts = state.listProducts.map(item => {
          return item.link !== action.link ? item : { ...item, [action.parameter]: action.index };
        });
        return {...state, listProducts };
      }

    }
    case SET_OBSERVABLE_PRODUCT: {
      return { ...state, observableProduct: action.product};
    }
    case UNSET_OBSERVABLE_PRODUCT: return { ...state, observableProduct: null};

    default:                        return state;
  }
};

export default store;