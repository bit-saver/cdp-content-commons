/**
 *
 * Admin
 *
 */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectAdmin from './selectors';

// Could redirect to / after login but reusing LandingPage for now
// as there will be a separate Loggded in Landing that contains draft content
// import LandingPage from 'components/Pages/LandingPage';
import Dashboard from '../Dashboard';

import './Admin.css';

/* eslint-disable react/prefer-stateless-function */
class Admin extends React.PureComponent {
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

Admin.propTypes = {
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  admin: makeSelectAdmin()
} );

export default connect( mapStateToProps, actions )( Admin );
