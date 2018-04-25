import { categoryAggRequest, categoryBaseRequest } from '../utils/api';
import { titleCase } from '../utils/helpers';
import { LOAD_CATEGORIES_PENDING, LOAD_CATEGORIES_FAILED, LOAD_CATEGORIES_SUCCESS, CATEGORY_CHANGE } from './types';

export const categoryUpdate = ( category, checked ) => ( {
  type: CATEGORY_CHANGE,
  payload: category
} );

export const loadCategories = () => async ( dispatch ) => {
  dispatch( { type: LOAD_CATEGORIES_PENDING } );

  let response;
  let primary;
  try {
    response = await categoryAggRequest();
    primary = await categoryBaseRequest();
  } catch ( err ) {
    return dispatch( { type: LOAD_CATEGORIES_FAILED } );
  }

  const primaryCategories = primary.hits.hits.map( category => category._source.language.en );
  const categoryBuckets = response.aggregations.category.buckets;
  const idBuckets = response.aggregations.id.buckets;

  // only display primary categories that have associated content
  const payload = categoryBuckets
    .filter( category => primaryCategories.includes( category.key ) )
    .map( ( category, index ) => ( {
      key: idBuckets[index].key,
      display: titleCase( category.key ),
      count: category.doc_count
    } ) );

  return dispatch( {
    type: LOAD_CATEGORIES_SUCCESS,
    payload
  } );
};
