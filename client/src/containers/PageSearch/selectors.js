import { createSelector } from 'reselect';

/**
 * Direct selector to the searchResults state
 */
const selectPageSearch = state => state.searchPage;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SearchResults
 */
const makeSelectSearchPage = props =>
  createSelector( selectPageSearch, substate => substate );

export default makeSelectSearchPage;
export { selectPageSearch };
