/**
 *
 * Dashboard
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

        { !this.props.isAuthenticated &&
          <GlobalLoggedOutNav
            mobileNavVisible={ mobileNavVisible }
            toggleMobileNav={ this.handleNavClick }
            keyUp={ this.keyUp }
          />
        }
        { this.props.isAuthenticated &&
          <GlobalLoggedInNav
            mobileNavVisible={ mobileNavVisible }
            toggleMobileNav={ this.handleNavClick }
            keyUp={ this.keyUp }
          />
        }
      </nav>
    );
  }
}


Nav.propTypes = {
  isAuthenticated: PropTypes.bool
};

function mapStateToProps( state ) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect( mapStateToProps )( Nav );
