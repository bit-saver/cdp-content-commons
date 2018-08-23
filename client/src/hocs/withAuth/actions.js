/*
 *
 * withAuth actions
 *
 */
/* eslint-disable no-unused-vars */
import { AUTHENTICATE_USER, AUTHENTICATE_ERROR } from './constants';
// import cognito service


export const signup = () => ( dispatch ) => {
  // localStorage.setItem( 'token', response.data.token );

  dispatch( {
    type: AUTHENTICATE_USER,
    payload: true
  } );
};


export const signin = () => ( dispatch ) => {
  // localStorage.setItem( 'token', response.data.token );

  dispatch( {
    type: AUTHENTICATE_USER,
    payload: true
  } );
};

export const signout = () =>
// localStorage.removeItem( 'token' );

  ( {
    type: AUTHENTICATE_USER,
    payload: false
  } );

