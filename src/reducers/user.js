import { SET_CURRENT_USER, } from '../constants';

const init = {
  currentUser: {},
  isAdmin: false,
};

const reducerResponseState = (state = init, action)  => {
  switch (action.type) {
    case SET_CURRENT_USER: return {
      ...state, 
      currentUser: action.currentUser, 
      isAdmin: action.currentUser && action.currentUser.email === process.env.ADMIN_EMAIL,
    };

    default:                     return state;
  }
};

export default reducerResponseState;