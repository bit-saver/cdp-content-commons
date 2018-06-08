import {
  LOAD_POST_TYPES_PENDING,
  LOAD_POST_TYPES_FAILED,
  LOAD_POST_TYPES_SUCCESS,
  POST_TYPE_CHANGE
} from '../actions/types';

let currentState = sessionStorage.getItem( 'currentState' );
currentState = JSON.parse( currentState );

const INITIAL_STATE = ( currentState && window.location.pathname !== '/' ) ? currentState.type : {
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
      return {
        ...state,
        currentPostTypes: action.payload.checked
          ? [...state.currentPostTypes, { type: action.payload.type, display_name: action.payload.display_name }]
          : state.currentPostTypes.filter( category => category.type !== action.payload.type )
      };
    default:
      return state;
  }
};
