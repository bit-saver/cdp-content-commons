import { LOAD_ALERT_FAILED, LOAD_ALERT_SUCCESS, LOAD_ALERT_PENDING, ALERT_CLOSED_CHANGE } from '../actions/types';

const INITIAL_STATE = {
  isClosed: false,
  isOpenNet: false,
  showAlert: false
};

export default ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case LOAD_ALERT_PENDING:
      return {
        ...state
      };
    case LOAD_ALERT_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case LOAD_ALERT_FAILED:
      return {
        ...state,
        showAlert: false,
        error: true
      };
    case ALERT_CLOSED_CHANGE:
      return {
        ...state,
        isClosed: true,
        showAlert: false
      };
    default: return state;
  }
};
