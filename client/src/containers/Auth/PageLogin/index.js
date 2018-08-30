/**
 *
 * LoginPage
 *
 */
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from '../actions';
import { makeSelectAuthenticated } from '../selectors';
import { Button } from 'semantic-ui-react';
import ButtonGoogle from 'components/ButtonGoogle';

import Page from 'components/Page';

import './PageLogin.css';

const PageLogin = ( props ) => {
  const federated = {
    google_client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
  };

  const handleAuthStateChange = ( state ) => {
    if ( state === 'signedIn' ) {
      props.login();
      // after successful login, redirect to loggedin home page
      props.history.push( '/admin/dashboard' );
    }
  };

  const handleClickLogout = () => {
    props.logout();
  };

  const renderLoginPage = () => (
    <Page title="Login" description="Login to Content Commons">
      <div className="login login_wrapper">
        <h1>Log In</h1>
        <p className="login_subtext">Log in to collect, upload, and manage content in the Content Commons.</p>
        <ButtonGoogle federated={ federated } onStateChange={ handleAuthStateChange } />

        { /* /------- NOT INCL IN MVP  --------/ */ }
        { /* <p className="login_optionText">Or</p>
        <Form>
          <Form.Input label="Email" type="text" placeholder="Your email address" />
          <Form.Input label="Password" type="password" placeholder="********" />
          <div className="login_email">
            <div className="login_email--button">
              <Button type="submit">Log in</Button>
            </div>
            <div className="login_email--account">
              <Link to="#">Forgot your password?</Link>
              <p>Don't have an account? <Link to="#">Register</Link></p>
            </div>
          </div>
        </Form> */ }

      </div>
    </Page>
  );

  const renderLogoutPage = () => (
    <Page title="Login" description="Login to Content Commons">
      <div className="login login_wrapper">
        <h1>Log Out</h1>
        <p className="login_subtext">Log out of the Content Commons.</p>
        <Button onClick={ handleClickLogout }>Log out</Button>
      </div>
    </Page>
  );

  if ( props.authenticated ) {
    return renderLogoutPage();
  }
  return renderLoginPage();
};


PageLogin.propTypes = {
  login: PropTypes.func,
  logout: PropTypes.func
};

const mapStateToProps = state => createStructuredSelector( {
  authenticated: makeSelectAuthenticated()
} );

export default withRouter( connect( mapStateToProps, actions )( PageLogin ) );
