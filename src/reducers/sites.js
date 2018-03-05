import {
  LOAD_SITES_PENDING,
  LOAD_SITES_SUCCESS,
  LOAD_SITES_FAILED,
  SITE_CHANGE
} from '../actions/types';

const INITIAL_STATE = {
  error: false,
  list: [],
  loading: false,
  currentSite: ''
};

export default ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case LOAD_SITES_PENDING:
      return {
        ...state,
        loading: true
      };
    case LOAD_SITES_FAILED:
      return {
        ...state,
        ...INITIAL_STATE,
        error: true,
        loading: false
      };
    case LOAD_SITES_SUCCESS:
      return {
        ...state,
        error: true,
        loading: false,
        list: action.payload
      };
    case SITE_CHANGE:
      return {
        ...state,
        currentSite: action.payload
      };
    default:
      return state;
  }
};
