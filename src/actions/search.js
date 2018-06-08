import { showLoading, hideLoading } from 'react-redux-loading-bar';
import range from 'lodash.range';
import {
  SEARCH_QUERY_UPDATE,
  SEARCH_AUTHOR_UPDATE,
  SEARCH_TAG_UPDATE,
  SEARCH_REQUEST_PENDING,
  SEARCH_REQUEST_FAILED,
  SEARCH_REQUEST_SUCCESS,
  SEARCH_PAGE_PENDING,
  SEARCH_PAGE_FAILED,
  SEARCH_PAGE_SUCCESS,
  SEARCH_SORT_PENDING,
  SEARCH_SORT_FAILED,
  SEARCH_SORT_SUCCESS
} from './types';
import { queryRequest } from '../utils/api';
import { queryBuilder } from '../utils/helpers';

const PAGE_SIZE = 12;

export const calculatePages = ( _total, _currentPage, pageSize = PAGE_SIZE ) => {
  const total = _total;
  const currentPage = _currentPage;
  const totalPages = Math.ceil( total / pageSize );

  let startPage;
  let endPage;
  if ( totalPages > 5 ) {
    // more than 5 total pages so calculate start and end pages
    if ( currentPage <= 3 ) {
      startPage = 1;
      endPage = 5;
    } else if ( currentPage + 2 >= totalPages ) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  } else {
    // less than 5 total pages, so show only the amount of pages
    startPage = 1;
    endPage = totalPages;
  }

  // calculate start and end item indices
  const startIndex = ( currentPage - 1 ) * pageSize;
  const offset = startIndex + pageSize;
  const endIndex = Math.min( offset - 1, total - 1 );

  // create an array of pages
  const pages = range( startPage, endPage + 1 );

  return {
    total,
    currentPage,
    pageSize,
    totalPages,
    startPage,
    endPage,
    startIndex,
    endIndex,
    pages
  };
};

export const updateSearchQuery = payload => ( {
  type: SEARCH_QUERY_UPDATE,
  payload
} );

export const updateSearchAuthor = payload => ( {
  type: SEARCH_AUTHOR_UPDATE,
  payload
} );

export const updateSearchTag = payload => ( {
  type: SEARCH_TAG_UPDATE,
  payload
} );

export const createRequest = () => async ( dispatch, getState ) => {
  dispatch( showLoading() );
  dispatch( { type: SEARCH_REQUEST_PENDING } );

  let response;
  const currentState = getState();

  try {
    response = await queryRequest( {
      size: PAGE_SIZE,
      body: queryBuilder( currentState )
    } );
  } catch ( err ) {
    dispatch( hideLoading() );
    return dispatch( { type: SEARCH_REQUEST_FAILED } );
  }

  dispatch( hideLoading() );
  return dispatch( {
    type: SEARCH_REQUEST_SUCCESS,
    payload: {
      response,
      ...calculatePages( response.hits.total, 1 ),
      currentQuery: currentState.search.query
    }
  } );
};

export const targetRequest = ( page, pageSize = PAGE_SIZE ) => async ( dispatch, getState ) => {
  let offset = pageSize;
  const pageOffset = page * offset;
  offset = pageOffset - offset;
  dispatch( showLoading() );
  dispatch( { type: SEARCH_PAGE_PENDING } );

  let response;
  try {
    response = await queryRequest( {
      body: queryBuilder( getState() ),
      from: offset,
      size: pageSize
    } );
  } catch ( err ) {
    dispatch( hideLoading() );
    return dispatch( { type: SEARCH_PAGE_FAILED } );
  }

  dispatch( hideLoading() );
  window.scrollTo( 0, 0 );
  return dispatch( {
    type: SEARCH_PAGE_SUCCESS,
    payload: {
      response,
      current: page,
      ...calculatePages( response.hits.total, page, pageSize )
    }
  } );
};

export const sortRequest = ( sortType, pageSize = PAGE_SIZE ) => async ( dispatch, getState ) => {
  dispatch( showLoading() );
  dispatch( {
    type: SEARCH_SORT_PENDING,
    payload: {
      sort: sortType,
      isFetching: true,
      error: false
    }
  } );

  let response;
  try {
    response = await queryRequest( {
      body: queryBuilder( getState() ),
      size: pageSize
    } );
  } catch ( err ) {
    dispatch( hideLoading() );
    return dispatch( { type: SEARCH_SORT_FAILED } );
  }

  dispatch( hideLoading() );
  return dispatch( {
    type: SEARCH_SORT_SUCCESS,
    payload: {
      response,
      ...calculatePages( response.hits.total, 1, pageSize )
    }
  } );
};

export const updateSizeRequest = newSize => async ( dispatch, getState ) => {
  dispatch( showLoading() );
  dispatch( { type: SEARCH_REQUEST_PENDING } );

  let response;
  const currentState = getState();
  try {
    response = await queryRequest( {
      size: newSize,
      body: queryBuilder( currentState )
    } );
  } catch ( err ) {
    dispatch( hideLoading() );
    return dispatch( { type: SEARCH_REQUEST_FAILED } );
  }

  dispatch( hideLoading() );

  return dispatch( {
    type: SEARCH_REQUEST_SUCCESS,
    payload: {
      response,
      ...calculatePages( response.hits.total, 1, newSize )
    }
  } );
};
