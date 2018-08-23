/*
 *
 * SearchBar reducer
 *
 */

import { SEARCH_TERM_UPDATE } from './constants';


export const INITIAL_STATE = {
  searchTerm: ''
};

function searchBarReducer( state = INITIAL_STATE, action ) {
  switch ( action.type ) {
    case SEARCH_TERM_UPDATE:
      return state;
    default:
      return state;
  }
}

export default searchBarReducer;
