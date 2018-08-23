/*
 *
 * Header reducer
 *
 */

import { AUTHENTICATE_USER, AUTHENTICATE_ERROR } from './constants';

export const INITIAL_STATE = {
  isAuthenticated: true, // set true for now
  error: ''
};

function withAuthReducer( state = INITIAL_STATE, action ) {
  switch ( action.type ) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        isAuthenticated: action.payload
      };

    case AUTHENTICATE_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}

export default withAuthReducer;
