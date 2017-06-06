import { combineReducers } from 'redux';

import searchReducer from './search';
import languagesReducer from './languages';
import postTypeReducer from './postTypes';
import dateReducer from './date';

export default combineReducers({
  search: searchReducer,
  language: languagesReducer,
  type: postTypeReducer,
  date: dateReducer,
});
