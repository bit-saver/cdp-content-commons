import { CLEAR_FILTERS } from './types';

export * from './alert';
export * from './language';
export * from './category';
export * from './search';
export * from './postType';
export * from './date';
export * from './source';

export const clearFilters = () => ( {
  type: CLEAR_FILTERS
} );
