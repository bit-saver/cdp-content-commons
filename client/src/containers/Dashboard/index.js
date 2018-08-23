/**
 *
 * Dashboard
 *
 */
import React from 'react';
// import PropTypes from 'prop-types';;
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectDashboard from './selectors';

import './Dashboard.css';

/* eslint-disable react/prefer-stateless-function */
class Dashboard extends React.Component {
  render() {
    return (
      <div>[ DASHBOARD CONTENT ]</div>
    );
  }
}

Dashboard.propTypes = {
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  dashboard: makeSelectDashboard()
} );

export default connect( mapStateToProps, actions )( Dashboard );
