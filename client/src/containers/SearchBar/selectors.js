import { createSelector } from 'reselect';
// import { INITIAL_STATE } from './reducer';

/**
 * Direct selector to the searchBar state
 */
const selectSearchBar = state => state.searchBar;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SearchBar
 */
const makeSelectSearchBar = props =>
  createSelector( selectSearchBar, substate => substate );

export default makeSelectSearchBar;
export { selectSearchBar };
