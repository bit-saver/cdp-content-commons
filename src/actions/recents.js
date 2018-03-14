import { queryRequest } from '../utils/api';
import bodybuilder from 'bodybuilder';

import {
  LOAD_RECENTS_PENDING,
  LOAD_RECENTS_FAILED,
  LOAD_RECENTS_SUCCESS
} from './types';

export const recentsRequest = currentType => async ( dispatch ) => {
  dispatch( { type: LOAD_RECENTS_PENDING } );

  let response;
  try {
    response = await queryRequest( {
      size: 4,
      body: bodybuilder()
        .query( 'match', 'type', currentType )
        .sort( 'published', 'desc' )
        .build()
    } );
  } catch ( err ) {
    return dispatch( { type: LOAD_RECENTS_FAILED } );
  }

  return dispatch( {
    type: LOAD_RECENTS_SUCCESS,
    payload: {
      response
    }
  } );
};
