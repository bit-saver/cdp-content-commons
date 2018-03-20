import {
  LOAD_RECENTS_PENDING,
  LOAD_RECENTS_FAILED,
  LOAD_RECENTS_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  error: false,
  items: [],
  loading: false
};

export default ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case LOAD_RECENTS_PENDING:
      return {
        ...state,
        loading: true
      };
    case LOAD_RECENTS_FAILED:
      return {
        ...state,
        ...INITIAL_STATE,
        error: true,
        loading: false
      };
    case LOAD_RECENTS_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        items: action.payload
      };
    default:
      return state;
  }
};
