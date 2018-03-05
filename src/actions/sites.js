import { siteAggRequest } from '../utils/api';
import { LOAD_SITES_PENDING, LOAD_SITES_SUCCESS, LOAD_SITES_FAILED, SITE_CHANGE } from './types';

export const siteUpdate = site => ( {
  type: SITE_CHANGE,
  payload: site
} );

export const loadSites = () => async ( dispatch ) => {
  dispatch( { type: LOAD_SITES_PENDING } );

  let response;
  try {
    response = await siteAggRequest();
  } catch ( err ) {
    return dispatch( { type: LOAD_SITES_FAILED } );
  }

  const { buckets } = response.aggregations.site;
  const payload = buckets.map( site => ( {
    key: site.key,
    display: site.key
  } ) );

  return dispatch( {
    type: LOAD_SITES_SUCCESS,
    payload
  } );
};
