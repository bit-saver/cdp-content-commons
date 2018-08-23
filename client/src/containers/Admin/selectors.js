import { createSelector } from 'reselect';
// import { INITIAL_STATE } from './reducer';

/**
 * Direct selector to the admin state
 */
const selectAdmin = state => state.admin;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Admin
 */
const makeSelectAdmin = props =>
  createSelector( selectAdmin, substate => substate );

export default makeSelectAdmin;
export { selectAdmin };
