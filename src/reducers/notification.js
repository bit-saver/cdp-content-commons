import * as t from '../actions/types';

export const INITIAL_STATE = {
  type: '',
  open: false,
  message: ''
};

export default ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case t.SHOW_NOTIFICATION:
      return {
        ...state,
        open: true,
        ...action.payload
      };
    case t.CLOSE_NOTIFICATION:
      return INITIAL_STATE;
    default:
      return state;
  }
};
