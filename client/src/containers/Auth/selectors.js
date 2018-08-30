import { createSelector } from 'reselect';

/**
 * Direct selector to the auth state
 */
const selectAuth = state => state.auth;
const selectAuthenticated = state => state.auth.authenticated;

/**
 * Other specific selectors
 */


const makeSelectAuthenticated = props =>
  createSelector( selectAuth, auth => auth.authenticated );


const makeSelectUser = props =>
  createSelector( selectAuthenticated, authenticated => ( ( authenticated && authenticated.user )
    ? authenticated.user
    : null
  ) );


export {
  selectAuth,
  makeSelectAuthenticated,
  makeSelectUser
};
