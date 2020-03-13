import { SET_RESPONSE_STATE, CLEAR_RESPONSE_STATE, SET_REDIRECT, REDIRECT_IS_PASSED } from '../constants';

const init = {
  response: {},
  redirect: '',
};

const reducerResponseState = (state = init, action)  => {
  switch (action.type) {
    case SET_RESPONSE_STATE: return { ...state, response: action.response };
    case CLEAR_RESPONSE_STATE: return { ...state, response: {}};

    case SET_REDIRECT: return { ...state, redirect: action.link };
    case REDIRECT_IS_PASSED: return {...state, redirect: ''};

    default:                     return state;
  }
};

export default reducerResponseState;