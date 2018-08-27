/**
 *
 * PageRegister
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from '../actions';
// import PropTypes from 'prop-types';
import Page from 'components/Page';

import './PageRegister.css';

const PageRegister = props => (
  <Page title="Register" description="Create an account with Content Commons">
    <div className="register register_wrapper">
      <h1>Register</h1>
    </div>
  </Page>
);

PageRegister.propTypes = {};

const mapStateToProps = state => createStructuredSelector( {
} );

export default connect( mapStateToProps, actions )( PageRegister );
