import { createSelector } from 'reselect';

/**
 * Direct selector to the auth state
 */
const selectAuth = state => state.auth;

/**
 * Other specific selectors
 */


const makeSelectAuthenticated = props =>
  createSelector( selectAuth, auth => auth.authenticated );


export {
  selectAuth,
  makeSelectAuthenticated
};
