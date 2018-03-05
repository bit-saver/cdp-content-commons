import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as ReactTapEventPlugin from 'react-tap-event-plugin';

import './App.css';
import ResultsPage from './components/ResultsPage';
import LandingPage from './components/LandingPage';

ReactTapEventPlugin();

const App = () => (
  <Switch>
    <Route path="/" exact component={ LandingPage } />
    <Route path="/results" component={ ResultsPage } />
    <Redirect to="/" />
  </Switch>
);

export default App;
