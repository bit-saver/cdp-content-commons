import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as ReactTapEventPlugin from 'react-tap-event-plugin';

import './App.css';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Nav from './components/Nav';
import Results from './components/Results';

ReactTapEventPlugin();

const App = () => (
  <div>
    <Header />
    <Nav />
    <main className="ui container">
      <Switch>
        <Route path="/" exact component={ LandingPage } />
        <Route path="/results" component={ Results } />
        <Redirect to="/" />
      </Switch>
    </main>
  </div>
);

export default App;
