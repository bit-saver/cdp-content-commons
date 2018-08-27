/*
 *
 * Auth actions
 *
 */
import { Auth, Cache } from 'aws-amplify';
import {
  LOGIN,
  LOGOUT
} from './constants';

export const login = () => async ( dispatch ) => {
  const federatedInfo = Cache.getItem( 'federatedInfo' );
  dispatch( {
    type: LOGIN,
    payload: federatedInfo
  } );
};

export const logout = () => async ( dispatch ) => {
  Auth.signOut();
  dispatch( {
    type: LOGOUT,
    payload: ''
  } );
};
