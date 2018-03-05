import {
  LOAD_POST_TYPES_PENDING,
  LOAD_POST_TYPES_FAILED,
  LOAD_POST_TYPES_SUCCESS,
  POST_TYPE_CHANGE
} from '../actions/types';

const INITIAL_STATE = {
  error: false,
  list: [],
  loading: false,
  currentPostType: ''
};

export default ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case LOAD_POST_TYPES_PENDING:
      return {
        ...state,
        loading: true
      };
    case LOAD_POST_TYPES_FAILED:
      return {
        ...state,
        ...INITIAL_STATE,
        error: true,
        loading: false
      };
    case LOAD_POST_TYPES_SUCCESS:
      return {
        ...state,
        error: true,
        loading: false,
        list: action.payload
      };
    case POST_TYPE_CHANGE:
      return {
        ...state,
        currentPostType: action.payload
      };
    default:
      return state;
  }
};
