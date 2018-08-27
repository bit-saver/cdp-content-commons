/**
 *
 * Global Nav
 *
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Icon, Responsive } from 'semantic-ui-react';
import GlobalLoggedInNav from './GlobalLoggedInNav';
import GlobalLoggedOutNav from './GlobalLoggedOutNav';

import './Nav.css';

class Nav extends PureComponent {
  constructor( props ) {
    super( props );
    this.state = {
      mobileNavVisible: false
    };
  }


  handleKeyUp = ( e ) => {
    if ( e.key === 'Enter' ) {
      this.handleNavClick();
    }
  }

  handleNavClick = () => {
    if ( !this.state.mobileNavVisible ) {
      this.setState( { mobileNavVisible: true } );
    } else {
      this.setState( { mobileNavVisible: false } );
    }
  }

  renderNav() {
    const { mobileNavVisible } = this.state;

    if ( this.props.authenticated ) {
      return (
        <GlobalLoggedInNav
          mobileNavVisible={ mobileNavVisible }
          toggleMobileNav={ this.handleNavClick }
          keyUp={ this.keyUp }
        />
      );
    }

    return (
      <GlobalLoggedOutNav
        mobileNavVisible={ mobileNavVisible }
        toggleMobileNav={ this.handleNavClick }
        keyUp={ this.keyUp }
      />
    );
  }

  render() {
    const { mobileNavVisible } = this.state;

    return (
      <nav>
        <Responsive
          as={ Icon }
          name="content"
          maxWidth={ 992 }
          onClick={ this.handleNavClick }
          onKeyUp={ this.keyUp }
          tabIndex={ 0 }
          className={ mobileNavVisible ? 'mobileNav' : 'fullNav' }
        />

        { this.renderNav() }
      </nav>
    );
  }
}


Nav.propTypes = {
  authenticated: PropTypes.object
};

function mapStateToProps( state ) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect( mapStateToProps )( Nav );
