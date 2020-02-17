import * as constants from '../constants/';

export const setLoadingListProduct = loading => ({ type: constants.SET_LOADING_LIST_PRODUCT, loading });
export const getShortListProduct = () => ({ type: constants.GET_SHORT_LIST_PRODUCT }); 
export const setShortListProduct = listProducts => ({ type: constants.SET_SHORT_LIST_PRODUCT, listProducts });

export const setLoadingItemProduct = loading => ({ type: constants.SET_LOADING_ITEM_PRODUCT, loading });
export const getItemProduct = productLink => ({ type: constants.GET_ITEM_PRODUCT, productLink });
export const setItemProduct = itemProduct => ({ type: constants.SET_ITEM_PRODUCT, itemProduct });
