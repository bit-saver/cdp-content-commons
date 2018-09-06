/*
 *
 * Auth actions
 *
 */
import { Auth, Cache } from 'aws-amplify';
import {
  LOGIN_ERROR,
  LOGIN,
  LOGOUT
} from './constants';


const dispatchError = ( dispatch, err, callbackError ) => {
  let msg = 'Login failed.';
  if ( err && err.error !== 'popup_closed_by_user' ) { // user closes window before selecting a google email
    if ( err.reason && err.reason.indexOf( 'Account domain does not match hosted_domain' ) !== -1 ) {
      msg = 'You must use an america.gov email address to login';
    }
    dispatch( {
      type: LOGIN_ERROR,
      payload: 'Error'
    } );
    callbackError( msg );
  }
};

/**
 * Authenticate Google user against the Cognito identity pool
 * Cognito identity pool gives google user access to AWS services
 *
 * @param {object} googleUser Authenticated user returned from Google
 */
const federatedSignIn = async ( googleUser ) => {
  /* eslint-disable camelcase */
  const { id_token, expires_at } = googleUser.getAuthResponse();
  const profile = googleUser.getBasicProfile();
  let user = {
    email: profile.getEmail(),
    name: profile.getName()
  };

  await Auth.federatedSignIn(
    'google',
    { token: id_token, expires_at },
    user
  );

  user = await Auth.currentAuthenticatedUser();
  return user;
};

/**
 * Authenticate via Google
 *
 * @param {function} callbackSuccess function to execute on success
 * @param {function} callbackError function to execute on error
 */
export const googleLogin = ( callbackSuccess, callbackError ) => async ( dispatch ) => {
  try {
    const ga = window.gapi && window.gapi.auth2
      ? window.gapi.auth2.getAuthInstance()
      : null;

    if ( ga ) {
      const googleUser = await ga.signIn();
      const user = await federatedSignIn( googleUser );

      dispatch( {
        type: LOGIN,
        payload: user
      } );
      callbackSuccess();
    } else {
      dispatchError( dispatch, 'Google is not available for authentication.', callbackError );
    }
  } catch ( err ) {
    dispatchError( dispatch, err, callbackError );
  }
};


export const login = () => async ( dispatch ) => {
  const federatedInfo = Cache.getItem( 'federatedInfo' );
  dispatch( {
    type: LOGIN,
    payload: federatedInfo
  } );
};

/**
 * Log user out.  Clears local storage of auth credentials
 */
export const logout = () => async ( dispatch ) => {
  Auth.signOut();
  dispatch( {
    type: LOGOUT,
    payload: ''
  } );
};
