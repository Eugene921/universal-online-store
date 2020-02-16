import {
  SET_SHORT_LIST_PRODUCT,
  SET_LOADING,
} from '../constants/';

const initState = {
  listProducts: [],
  loading: true,
};

const searchList = (state = initState, action)  => {
  switch (action.type) {
    case SET_SHORT_LIST_PRODUCT:    return { ...state, listProducts: action.listProducts };
    case SET_LOADING:               return {...state, loading: action.loading };

    default:                        return state;
  }
};

export default searchList;