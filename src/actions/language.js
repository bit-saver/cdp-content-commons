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

  const uniqLangWithContent = response.langsWithContent.aggregations.locale.buckets;
  const allLanguages = response.allLangs.hits.hits.map( lang => lang._source );

  const payload = uniqLangWithContent.map( bucket => ( {
    key: bucket.key,
    display: allLanguages.filter( lang => lang.locale === bucket.key )[0].display_name,
    count: bucket.doc_count
  } ) );

  return dispatch( {
    type: LOAD_LANGUAGES_SUCCESS,
    payload
  } );
};
