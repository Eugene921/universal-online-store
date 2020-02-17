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
        next(actions.setLoadingListProduct(true));

        return base.getShortItemsProduct()
          .then(listProducts => next(actions.setShortListProduct(listProducts)))
          .catch(err => console.error(err))
          .finally(() => next(actions.setLoadingListProduct(false)));
      }
    }

    case constants.GET_ITEM_PRODUCT: {
      next(actions.setLoadingItemProduct(true));
      
      return base.getItemProduct(action.productLink)
        .then(productItem => next(actions.setItemProduct(productItem)))
        .catch(err => console.error(err))
        .finally(() => next(actions.setLoadingItemProduct(false)));
    }
  
    default: return next(action);
  }
};

export default listMiddleware;