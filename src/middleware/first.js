import * as constants from '../constants';
import * as actions from '../actions';

import * as base from '../../data_base/api_of_base';
import { firebaseAuth } from '../../data_base/base';


const listMiddleware = store => (next) => async (action) => {
  switch (action.type) {
    case constants.GET_SHORT_LIST_PRODUCT: {
      next(actions.setLoadingStore(true));
      try {
        const listProducts = await base.getShortListProducts();
        next(actions.setShortListProduct(listProducts));
      } catch (error) {
        console.error(error);
      }
      next(actions.setLoadingStore(false));
    } break;

    case constants.DELETE_PRODUCT: {
      next(actions.setLoadingStore(true));
      try {
        const res = await base.deleteItemProduct(action.link);
        if(res) next(action);
      } catch (error) {
        console.error(error);
      }
      next(actions.setLoadingStore(false));
    } break;

    case constants.GET_PRODUCT: {
      next(actions.setLoadingProduct(true));

      try {
        const product = await base.dbGetItemProduct(action.link);
        console.log('product', product);
        next(actions.setProduct(product));
      } catch (error) {
        console.error(error);
      }
      next(actions.setLoadingProduct(false));
    } break;

    case constants.POST_PRODUCT: {
      next(actions.setLoadingProduct(true));

      try {
        await base.postProduct(action.product);
        console.log('action.product', action.product);
        

        next(actions.setResponseState({
          state: 'confirm',
          link: '/store/' + action.product.link,
          text: 'Product has been saved',
        }));

      } catch (error) {
        console.error(error);
      }
      next(actions.setLoadingProduct(false));
    } break;

    case constants.SIGN_OUT_CURRENT_USER: {
      try {
        await firebaseAuth.signOut();
        next(actions.setCurrentUser(null));
      } catch (error) {
        next(actions.setResponseState({
          state: 'reject',
          text: 'You failed to log out',
        }));
      }
    } break;

    case constants.LOGIN_CURRENT_USER: {
      const { currentUser } = store.getState().user;

      if (!currentUser && action.loginData) {
          try {
            const { email, password } = action.loginData;
            const { user } = await firebaseAuth.signInWithEmailAndPassword(email, password);

            next(actions.setCurrentUser(user));
          } catch (error) {
            next(actions.setResponseState({
              state: 'reject',
              name: error.name,
              text: error.message,
              stack: error.code,
            }));
          }
      }
    } break;
  
    case constants.GET_CURRENT_USER: {
      firebaseAuth.onAuthStateChanged(user => next(actions.setCurrentUser(user)));
    } break;

    case constants.GET_OBSERVABLE_PRODUCT: {
      next(actions.setLoadingStore(true));
      let product = null;
    
      if(!product) {
        try {
          product = await base.dbGetItemProduct(action.link);

          if(product) next(actions.setObservableProduct(product));
        } catch (error) {
          next(actions.setRedirect('/store'));
          next(actions.setResponseState({
              state: 'reject',
              name: error.name,
              text: error.message,
              stack: error.code,
            }));
        }
      }

      if(!product) {
        next(actions.setRedirect('/store'));
        next(actions.setResponseState({
          state: 'reject',
          name: 'Not found product',
          text: 'The product with the specified link is not in the database',
        }));
      }
      next(actions.setLoadingStore(false));    
    } break;

    default: return next(action);
  }
};

export default listMiddleware;