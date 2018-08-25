/**
 *
 * LoginPage
 *
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectPageLogin from './selectors';
import { Button } from 'semantic-ui-react';
import Page from 'components/Page';

import './PageLogin.css';

const PageLogin = props => (
  <div>
    <Page title="Login" description="Login to Content Commons">
      <div className="login login_wrapper">
        <h1>Log In</h1>
        <p className="login_subtext">Log in to collect, upload, and manage content in the Content Commons.</p>

        <Button>Log in with America.gov</Button>

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
  </div>
);

PageLogin.propTypes = {
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  loginpage: makeSelectPageLogin()
} );

export default connect( mapStateToProps, actions )( PageLogin );
