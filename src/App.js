import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as ReactTapEventPlugin from 'react-tap-event-plugin';

import './App.css';
import Nav from './components/Nav';
import Header from './components/Header';
import Results from './components/Results';
import Search from './components/Search';
import LandingPage from './components/LandingPage';

ReactTapEventPlugin();

const App = () => (
  <div className="ui container">
    <header>
      <Nav />
      <Header />
      <Search />
    </header>
    <main>
      <Switch>
        <Route path="/" exact component={ LandingPage } />
        <Route path="/results" component={ Results } />
        <Redirect to="/" />
      </Switch>
    </main>
  </div>
);

export default App;
