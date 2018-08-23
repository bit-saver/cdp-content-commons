/*
 *
 * SearchBar actions
 *
 */

import { SEARCH_TERM_UPDATE } from './constants';

export function updateSearchTerm() {
  return {
    type: SEARCH_TERM_UPDATE
  };
}
