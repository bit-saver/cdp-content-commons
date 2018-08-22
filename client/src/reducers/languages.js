import {
  LOAD_LANGUAGES_PENDING,
  LOAD_LANGUAGES_FAILED,
  LOAD_LANGUAGES_SUCCESS,
  LANGUAGE_CHANGE,
  CLEAR_FILTERS
} from '../actions/types';

const INITIAL_STATE = {
  error: false,
  list: [],
  loading: false,
  currentLanguage: { key: 'en-us', display_name: 'English' }
};

export default ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case LOAD_LANGUAGES_PENDING:
      return {
        ...state,
        loading: true
      };

    case LOAD_LANGUAGES_FAILED:
      return {
        ...state,
        ...INITIAL_STATE,
        error: true,
        loading: false
      };

    case LOAD_LANGUAGES_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        list: action.payload
      };

    case LANGUAGE_CHANGE:
      return {
        ...state,
        currentLanguage: action.payload ? action.payload : { key: 'en-us', display_name: 'English' }
      };

    case CLEAR_FILTERS:
      return {
        ...state,
        currentLanguage: { key: 'en-us', display_name: 'English' }
      };

    default:
      return state;
  }
};
