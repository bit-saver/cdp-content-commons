import { languageAggRequest } from '../utils/api';
import {
  LOAD_LANGUAGES_PENDING,
  LOAD_LANGUAGES_FAILED,
  LOAD_LANGUAGES_SUCCESS,
  LANGUAGE_CHANGE
} from './types';

export const languageUpdate = language => ( {
  type: LANGUAGE_CHANGE,
  payload: language
} );

export const loadLanguages = () => async ( dispatch ) => {
  dispatch( { type: LOAD_LANGUAGES_PENDING } );

  let response;
  try {
    response = await languageAggRequest();
  } catch ( err ) {
    return dispatch( { type: LOAD_LANGUAGES_FAILED } );
  }

  const { buckets } = response.aggregations.locale;
  const payload = buckets.map( lang => ( {
    key: lang.key,
    display: lang.display.buckets[0].key
  } ) );

  return dispatch( {
    type: LOAD_LANGUAGES_SUCCESS,
    payload
  } );
};
