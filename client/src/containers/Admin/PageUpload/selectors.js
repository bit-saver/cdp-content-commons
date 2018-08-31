import { createSelector } from 'reselect';

/**
 * Direct selector to the pageUpload state
 */
const selectPageUpload = state => state.pageUpload;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PageUpload
 */
const makeSelectPageUpload = props =>
  createSelector( selectPageUpload, substate => substate );

export default makeSelectPageUpload;
export { selectPageUpload };
