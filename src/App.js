import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as ReactTapEventPlugin from 'react-tap-event-plugin';

import './App.css';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import HelpPage from './components/HelpPage';
import Header from './components/Header';
import Results from './components/Results';
import Footer from './components/Footer';

ReactTapEventPlugin();

const App = () => (
  <div>
    <Header />
    <div className="ui container">
      <Switch>
        <Route path="/" exact component={ LandingPage } />
        <Route path="/results" component={ Results } />
        <Route path="/about" component={ AboutPage } />
        <Route path="/help" component={ HelpPage } />
        <Redirect to="/" />
      </Switch>
    </div>
    <Footer />
  </div>
);

export default App;
