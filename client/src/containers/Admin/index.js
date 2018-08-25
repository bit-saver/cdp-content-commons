/**
 *
 * Admin: A wrapper around all the admin sub routes
 *
 */
import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Could redirect to / after login but reusing LandingPage for now
// as there will be a separate Loggded in Landing that contains draft content
// import LandingPage from 'components/Pages/LandingPage';
import Dashboard from './Dashboard';

/* eslint-disable react/prefer-stateless-function */
class Admin extends PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>Admin</title>
          <meta name="description" content="Adminstrative area for content authoring" />
        </Helmet>
        <div>
          <Switch>
            <Route exact path="/admin/dashboard" component={ Dashboard } />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Admin;
