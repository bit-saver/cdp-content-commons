import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

// Load global styles before app so that the app styles override the semantic defaults
// Note: create react app v2 will support css modules, consuder using if LOE makes sense
import './global-styles.css';

// Import root app
import App from 'containers/App';

// Configure store
import store from './store';

// Configure aws services
import './services/aws-amplify';

import registerServiceWorker from './registerServiceWorker';

const MOUNT_NODE = document.getElementById( 'root' );

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <Route path="/" component={ App } />
    </BrowserRouter>
  </Provider>,
  MOUNT_NODE
);

registerServiceWorker();
