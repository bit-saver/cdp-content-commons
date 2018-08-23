import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Checks for authentication and if not reidrects to login page
 *
 * @param {React component} WrappedComponent Protected component
 */
const withAuth = ( WrappedComponent ) => {
  class HOC extends Component {
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }

    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      console.log( `isAuthenticated : ${this.props.isAuthenticated}` );

      if ( !this.props.isAuthenticated ) {
        this.props.history.push( '/' );
      }
    }

    render() {
      return (
        <WrappedComponent { ...this.props } /> );
    }
  }

  HOC.propTypes = {
    isAuthenticated: PropTypes.bool,
    history: PropTypes.object
  };

  const mapStateToProps = state => ( {
    isAuthenticated: state.auth.isAuthenticated
  } );

  return connect( mapStateToProps )( HOC );
};

export default withAuth;
