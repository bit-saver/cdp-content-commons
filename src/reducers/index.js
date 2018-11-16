import { combineReducers } from 'redux';

import searchReducer from './search';
import alertReducer from './alert';
import languagesReducer from './languages';
import categoriesReducer from './categories';
import postTypeReducer from './postTypes';
import dateReducer from './date';
import sourceReducer from './sources';

export default combineReducers( {
  search: searchReducer,
  alert: alertReducer,
  language: languagesReducer,
  category: categoriesReducer,
  type: postTypeReducer,
  date: dateReducer,
  source: sourceReducer
} );
