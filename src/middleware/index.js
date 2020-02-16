import * as constants from '../constants/';
import * as actions from '../actions/';

import * as base from '../base/base_product';

const listMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case constants.GET_SHORT_LIST_PRODUCT: {
      const { listProducts } = store.getState().productItem;

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
  
    default: return next(action);
  }
};

export default listMiddleware;