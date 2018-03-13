import { combineReducers } from 'redux';

import searchReducer from './search';
import languagesReducer from './languages';
import postTypeReducer from './postTypes';
import dateReducer from './date';
import siteReducer from './sites';
import recentsReducer from './recents';

export default combineReducers( {
  search: searchReducer,
  recents: recentsReducer,
  language: languagesReducer,
  type: postTypeReducer,
  date: dateReducer,
  site: siteReducer
} );
