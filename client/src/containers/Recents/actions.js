/*
 *
 * Recents actions
 *
 */
import { typeRecentsRequest } from 'utils/api';
import { normalizeItem } from 'utils/parser';
import config from 'config';
import {
  LOAD_RECENTS_PENDING,
  LOAD_RECENTS_FAILED,
  LOAD_RECENTS_SUCCESS
} from './constants';

export const loadRecents = ( postType, locale ) => async ( dispatch, getState ) => {
  const timeSinceLastLoad = getState().recents[postType].lastLoad;
  const isDataStale = ( Date.now() - timeSinceLastLoad ) > config.TIME_TO_STALE;

  if ( isDataStale ) {
    dispatch( {
      type: LOAD_RECENTS_PENDING,
      payload: { postType }
    } );

    let response;
    let items = [];
    try {
      response = await typeRecentsRequest( postType, locale );
    } catch ( err ) {
      return dispatch( {
        type: LOAD_RECENTS_FAILED,
        payload: { postType }
      } );
    }

    if ( response && response.hits && response.hits.hits ) {
      items = response.hits.hits.map( item => normalizeItem( item ) );
    }

    return dispatch( {
      type: LOAD_RECENTS_SUCCESS,
      payload: {
        postType,
        items
      }
    } );
  }
};
