import * as constants from '../constants/';
import * as actions from '../actions/';

import * as base from '../base/base_product';

const listMiddleware = (store) => (next) => (action) => {

  console.log(action.type);
  switch (action.type) {
    
    case constants.GET_SHORT_LIST_PRODUCT: {
      const { listProducts } = store.getState();

      if(listProducts) {
        return next(actions.setShortListProduct(listProducts));
      } else {
        next(actions.setLoading(true));

        return base.getShortItemsProduct()
          .then(listProducts => next(actions.setShortListProduct(listProducts)))
          .catch(err => console.error(err))
          .finally(() => next(actions.setLoading(false)));
      }
    }

    case action.GET_ITEM_PRODUCT: {
      console.log('GET_ITEM_PRODUCT' + store.getState());
      // base.getItemProduct();
      return next(action);
    }
  
    default: return next(action);
  }
};

export default listMiddleware;