import { createSelector } from 'reselect';
// import { INITIAL_STATE } from './reducer';

/**
 * Direct selector to the dashboard state
 */
const selectDashboard = state => state.dashboard;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Dashboard
 */
const makeSelectDashboard = props =>
  createSelector( selectDashboard, substate => substate );

export default makeSelectDashboard;
export { selectDashboard };
