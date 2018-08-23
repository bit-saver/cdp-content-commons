import { combineReducers } from 'redux';

// global reducers
import globalReducer from 'containers/App/reducers/';
import authReducer from 'hocs/withAuth/reducer';

// frontend reducers
// import searchReducer from './search';
import recentsReducer from 'containers/Recents/reducer';

// admin reducers

export default combineReducers( {
  // search: searchReducer,
  global: globalReducer,
  auth: authReducer,
  recents: recentsReducer
} );
