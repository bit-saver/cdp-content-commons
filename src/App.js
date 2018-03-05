import React from 'react';
import { Provider } from 'react-redux';
import * as ReactTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './utils/store';

import Nav from './components/Nav';
import Header from './components/Header';
import Results from './components/Results';
import Search from './components/Search';

ReactTapEventPlugin();

const App = () => (
  <Provider store={ store }>
    <Router>
      <div>
        <Nav />
        <Header />
        <Search />
        <Results />
      </div>
    </Router>
  </Provider>
);

export default App;
