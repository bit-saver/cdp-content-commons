import { createSelector } from 'reselect';
// import { INITIAL_STATE } from './reducer';

/**
 * Direct selector to the loginPage state
 */
const selectPageLogin = state => state.loginPage;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */
const makeSelectPageLogin = props =>
  createSelector( selectPageLogin, substate => substate );

export default makeSelectPageLogin;
export { selectPageLogin };
