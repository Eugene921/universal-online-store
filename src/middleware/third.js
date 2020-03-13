import * as constants from '../constants';
import { clearResponseState } from '../actions';

import { DELAY_OF_DELETE_RESPONSE_STATE_BAR } from '../config';

const listMiddleware = () => (next) => async (action) => {
  switch (action.type) {

    case constants.SET_RESPONSE_STATE: {
      next(action);
      
      setTimeout(() => {
        next(clearResponseState());
      }, DELAY_OF_DELETE_RESPONSE_STATE_BAR);
    } break;

    default: next(action);
  }
};

export default listMiddleware;