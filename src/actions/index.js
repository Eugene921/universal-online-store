import * as constants from '../constants/';

export const getShortListProduct = () => ({ type: constants.GET_SHORT_LIST_PRODUCT }); 
export const setShortListProduct = listProducts => ({ type: constants.SET_SHORT_LIST_PRODUCT, listProducts });

export const setLoading = loading => ({ type: constants.SET_LOADING, loading });