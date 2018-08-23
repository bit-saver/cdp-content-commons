import { createSelector } from 'reselect';
// import { INITIAL_STATE } from './reducer';

/**
 * Direct selector to the searchResults state
 */
const selectSearchPage = state => state.searchPage;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SearchResults
 */
const makeSelectSearchPage = props =>
  createSelector( selectSearchPage, substate => substate );

export default makeSelectSearchPage;
export { selectSearchPage };
