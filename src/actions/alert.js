import { LOAD_ALERT_FAILED, LOAD_ALERT_PENDING, LOAD_ALERT_SUCCESS, ALERT_CLOSED_CHANGE } from './types';
import { getOpenNetRequest } from '../utils/api';
import { detect } from 'detect-browser';

export const closeAlert = () => ( dispatch ) => {
  dispatch( { type: ALERT_CLOSED_CHANGE, payload: { isClosed: true } } );
};

/**
 * Determines if the client is on an OpenNet machine by using an
 * API endpoint to crosscheck the client IP address and if the browser
 * is not Chrome or FireFox.
 */
export const loadAlert = () => async ( dispatch ) => {
  dispatch( { type: LOAD_ALERT_PENDING } );
  let response;
  const browser = detect();
  const isChrome = browser && browser.name === 'chrome';
  const isFireFox = browser && browser.name === 'firefox';
  console.log( 'isChrome', isChrome, 'isFF', isFireFox );
  let showAlert = !isChrome && !isFireFox;

  if ( showAlert ) {
    // Fetch OpenNet flag from API
    try {
      response = await getOpenNetRequest();
      showAlert = response.isOpenNet;
    } catch ( err ) {
      return dispatch( { type: LOAD_ALERT_FAILED } );
    }
  }

  return dispatch( {
    type: LOAD_ALERT_SUCCESS,
    payload: {
      ...response,
      isClosed: false,
      showAlert
    }
  } );
};
