import {
  LOAD_POST_TYPES_PENDING,
  LOAD_POST_TYPES_FAILED,
  LOAD_POST_TYPES_SUCCESS,
  POST_TYPE_CHANGE,
  CLEAR_FILTERS
} from '../actions/types';

const INITIAL_STATE = {
  error: false,
  list: [],
  loading: false,
  currentPostTypes: []
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
        error: false,
        loading: false,
        list: action.payload
      };

    case POST_TYPE_CHANGE:
      // if there is no payload, clear selected currentPostTypes
      if ( !action.payload ) {
        return { ...state, currentPostTypes: [] };
      }

      // if item has been selected, i.e. checked, add it to the currentPostTypes array
      // else filter currentPostTypes array to remove if necessary
      return {
        ...state,
        currentPostTypes: action.payload.checked
          ? [...state.currentPostTypes, { key: action.payload.key, display_name: action.payload.display_name }]
          : state.currentPostTypes.filter( postType => postType.key !== action.payload.key )
      };

    case CLEAR_FILTERS:
      return { ...state, currentPostTypes: [] };

    default:
      return state;
  }
};
