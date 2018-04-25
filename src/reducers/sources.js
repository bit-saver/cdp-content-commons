import { LOAD_SOURCES_PENDING, LOAD_SOURCES_FAILED, LOAD_SOURCES_SUCCESS, SOURCE_CHANGE } from '../actions/types';

const INITIAL_STATE = {
  error: false,
  list: [],
  loading: false,
  currentSources: []
};

export default ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case LOAD_SOURCES_PENDING:
      return {
        ...state,
        loading: true
      };
    case LOAD_SOURCES_FAILED:
      return {
        ...state,
        ...INITIAL_STATE,
        error: true,
        loading: false
      };
    case LOAD_SOURCES_SUCCESS:
      return {
        ...state,
        error: true,
        loading: false,
        list: action.payload
      };
    case SOURCE_CHANGE:
      // if there is no payload, clear selected currentPostTypes
      if ( !action.payload ) {
        return { ...state, currentSources: [] };
      }
      return {
        ...state,
        currentSources: action.payload.checked
          ? [...state.currentSources, { display_name: action.payload.display_name }]
          : state.currentSources.filter( source => source.display_name !== action.payload.display_name )
      };
    default:
      return state;
  }
};
