import * as constants from '../constants/';

// __________LIST PRODUCTS_____________
export const setLoadingStore =                         loading => ({ type: constants.SET_LOADING_STORE, loading });

export const getShortListProduct =                          () => ({ type: constants.GET_SHORT_LIST_PRODUCT });
export const setShortListProduct =                listProducts => ({ type: constants.SET_SHORT_LIST_PRODUCT, listProducts });

export const selectProductParameter = (link, parameter, index) => ({ type: constants.SELECT_PRODUCT_PARAMETER, link, parameter, index });

export const getObservableProduct =    link => ({ type: constants.GET_OBSERVABLE_PRODUCT, link });
export const setObservableProduct = product => ({ type: constants.SET_OBSERVABLE_PRODUCT, product });
export const unsetObservableProduct =    () => ({ type: constants.UNSET_OBSERVABLE_PRODUCT });

// __________PRODUCT_____________
export const setLoadingProduct =   loading => ({ type: constants.SET_LOADING_PRODUCT, loading });

export const setProduct =          product => ({ type: constants.SET_PRODUCT, product });
export const getProduct =             link => ({ type: constants.GET_PRODUCT, link });
export const postProduct =         product => ({ type: constants.POST_PRODUCT, product });
export const deleteProduct =          link => ({ type: constants.DELETE_PRODUCT, link });

// __________RESPNSE BAR_____________
export const setResponseState =   response => ({ type: constants.SET_RESPONSE_STATE, response });
export const clearResponseState =       () => ({ type: constants.CLEAR_RESPONSE_STATE });

export const setRedirect =            link => ({ type: constants.SET_REDIRECT, link });
export const redirectIsPassed =         () => ({ type: constants.REDIRECT_IS_PASSED });

// __________USER NAV BAR_____________
export const setCurrentUser =  currentUser => ({ type: constants.SET_CURRENT_USER, currentUser });

export const getCurrentUser =           () => ({ type: constants.GET_CURRENT_USER });
export const loginCurrentUser =  loginData => ({ type: constants.LOGIN_CURRENT_USER, loginData });
export const signOutCurrentUser =       () => ({ type: constants.SIGN_OUT_CURRENT_USER });

// __________CART_____________
export const setCart =                              cart => ({ type: constants.SET_CART, cart });
     
export const addProductToCart =      (product, quantity) => ({ type: constants.ADD_PRODUCT_TO_CART, product, quantity });
export const deleteProductFromCart =                link => ({ type: constants.DELETE_PRODUCT_FROM_CART, link });

export const setProductQuantityInCart = (link, quantity) => ({ type: constants.SET_PRODUCT_QUANTITY_IN_CART, link, quantity });
