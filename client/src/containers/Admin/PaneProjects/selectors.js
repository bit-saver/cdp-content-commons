import { createSelector } from 'reselect';

/**
 * Direct selector to the paneProjects state
 */
const selectPaneProjects = state => state.paneProjects;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PaneProjects
 */
const makeSelectPaneProjects = props =>
  createSelector( selectPaneProjects, substate => substate );

export default makeSelectPaneProjects;
export { selectPaneProjects };
