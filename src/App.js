import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as ReactTapEventPlugin from 'react-tap-event-plugin';

import './App.css';
import { ScrollToTop } from './utils/helpers';
import LandingPage from './components/Pages/LandingPage';
import AboutPage from './components/Pages/AboutPage';
import HelpPage from './components/Pages/HelpPage';
import PrivacyPage from './components/Pages/PrivacyPage';
import ContactPage from './components/Pages/ContactPage';
import VideoPage from './components/Pages/VideoPage';
import NotFoundPage from './components/Pages/NotFoundPage';
import Header from './components/Header';
import Results from './components/Results';
import Footer from './components/Footer';

ReactTapEventPlugin();

const App = () => (
  <div>
    <Header />
    <div className="ui container">
      <Route component={ ScrollToTop } />
      <Switch>
        <Route path="/" exact component={ LandingPage } />
        <Route path="/results" component={ Results } />
        <Route path="/about" component={ AboutPage } />
        <Route path="/help" component={ HelpPage } />
        <Route path="/privacy" component={ PrivacyPage } />
        <Route path="/contact" component={ ContactPage } />
        <Route path="/video" component={ VideoPage } />
        <Route path="/404" component={ NotFoundPage } />
        <Redirect to="/404" />
      </Switch>
    </div>
    <Footer />
  </div>
);

export default App;
