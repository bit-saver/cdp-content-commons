import { combineReducers } from 'redux';

import searchReducer from './search';
import languagesReducer from './languages';
import categoriesReducer from './categories';
import postTypeReducer from './postTypes';
import dateReducer from './date';
import siteReducer from './sites';

export default combineReducers( {
  search: searchReducer,
  language: languagesReducer,
  category: categoriesReducer,
  type: postTypeReducer,
  date: dateReducer,
  site: siteReducer
} );
