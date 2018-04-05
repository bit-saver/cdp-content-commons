import { languageAggRequest } from '../utils/api';
import { LOAD_LANGUAGES_PENDING, LOAD_LANGUAGES_FAILED, LOAD_LANGUAGES_SUCCESS, LANGUAGE_CHANGE } from './types';

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

  const localeBuckets = response.aggregations.locale.buckets;
  const displayBuckets = response.aggregations.display.buckets;

  const payload = localeBuckets
    .filter( ( bucket, index ) => displayBuckets[index] && displayBuckets[index].key )
    .map( ( bucket, index ) => ( {
      key: bucket.key,
      display: displayBuckets[index].key,
      count: bucket.doc_count
    } ) );

  return dispatch( {
    type: LOAD_LANGUAGES_SUCCESS,
    payload
  } );
};
