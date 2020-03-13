import * as constants from '../constants';
import * as actions from '../actions';

const listMiddleware = () => (next) => async (action) => {
  switch (action.type) {
    case constants.SET_CURRENT_USER: {
      if(action.currentUser) {
        next(actions.setResponseState({
          state: 'confirm',
          text: 'You are authorized',
        }));
      } else {
        next(actions.setResponseState({
          state: 'warn',
          text: 'You are not authorized',
        }));
      }
      
      next(action);
    } break;

    default: return next(action);
  }
};

export default listMiddleware;