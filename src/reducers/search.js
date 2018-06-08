import {
  SEARCH_QUERY_UPDATE,
  SEARCH_REQUEST_PENDING,
  SEARCH_REQUEST_FAILED,
  SEARCH_REQUEST_SUCCESS,
  SEARCH_PAGE_PENDING,
  SEARCH_PAGE_FAILED,
  SEARCH_PAGE_SUCCESS,
  SEARCH_SORT_PENDING,
  SEARCH_SORT_FAILED,
  SEARCH_SORT_SUCCESS,
  SEARCH_AUTHOR_UPDATE,
  SEARCH_TAG_UPDATE
} from '../actions/types';

let currentState = sessionStorage.getItem( 'currentState' );
currentState = JSON.parse( currentState );

const INITIAL_STATE = ( currentState && window.location.pathname !== '/' ) ? currentState.search : {
  author: '',
  currentPage: -1,
  endIndex: 0,
  endPage: 0,
  error: '',
  isFetching: false,
  pageSize: 12,
  pages: [],
  query: '',
  currentQuery: '',
  response: {},
  sort: 'published',
  startIndex: 0,
  startPage: 1,
  tag: '',
  total: 0,
  totalPages: 0
};

export default ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case SEARCH_QUERY_UPDATE:
      return {
        ...state,
        query: action.payload
      };
    case SEARCH_AUTHOR_UPDATE:
      return {
        ...state,
        author: action.payload
      };
    case SEARCH_TAG_UPDATE:
      return {
        ...state,
        tag: action.payload
      };
    case SEARCH_REQUEST_PENDING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case SEARCH_REQUEST_FAILED:
      return {
        INITIAL_STATE,
        ...state,
        isFetching: false,
        error: true
      };
    case SEARCH_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        ...action.payload
      };
    case SEARCH_PAGE_PENDING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case SEARCH_PAGE_FAILED:
      return {
        INITIAL_STATE,
        ...state,
        isFetching: false,
        error: true
      };
    case SEARCH_PAGE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetching: false
      };
    case SEARCH_SORT_PENDING:
      return {
        ...state,
        ...action.payload
      };
    case SEARCH_SORT_FAILED:
      return {
        ...INITIAL_STATE,
        ...state,
        isFetching: false,
        error: true
      };
    case SEARCH_SORT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetching: false
      };
    default:
      return state;
  }
};
