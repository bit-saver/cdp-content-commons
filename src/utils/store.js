import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { loadState, saveState } from '../utils/storage';
import throttle from 'lodash.throttle';

// Get stored state
const persistedState = loadState();

const store = createStore( reducers, persistedState, applyMiddleware( thunk ) );

// Use subscribe store method to update state on every state change.
// Use throttle to ensure we are not writing to storage more than every second
// as stringify  is expensive operation
store.subscribe( throttle( () => {
  saveState( store.getState() );
}, 1000 ) );

export default store;
