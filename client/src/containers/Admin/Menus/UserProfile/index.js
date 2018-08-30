import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from 'containers/Auth/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from 'containers/Auth/selectors';
import '../Menu.css';

class UserProfileMenu extends Component {
  constructor( props ) {
    super( props );
    this.logoutClick = this.logoutClick.bind( this );
    this.linkClick = this.linkClick.bind( this );
  }

  logoutClick( e ) {
    e.preventDefault();
    if ( this.props.toggleMobileNav ) {
      this.props.toggleMobileNav();
    }
    this.props.logout();
  }

  linkClick() {
    if ( this.props.toggleMobileNav ) {
      this.props.toggleMobileNav();
    }
    this.props.submenuClosePopup();
  }

  render() {
    const { user } = this.props;
    const name = ( user && user.name ) ? user.name : '';

    return (
      <div className="nav_submenu">
        <div className="nav_submenu_header">
          <p className="nav_submenu_header_item nav_submenu_header_item--title">Welcome { name }!</p>
        </div>
        <section className="nav_submenu_section">
          <Link
            to="/admin/dashboard"
            onClick={ this.linkClick }
            className="nav_submenu_item nav_submenu_item--margin"
          >Dashboard
          </Link>
          <Link
            to="/profile"
            onClick={ this.linkClick }
            className="nav_submenu_item nav_submenu_item--profile_settings"
          >Profile Settings
          </Link>
        </section>
        <section className="nav_submenu_section">
          <Link
            onClick={ this.linkClick }
            to="/about"
            className="nav_submenu_item nav_submenu_item--margin"
          >About
          </Link>
          <Link onClick={ this.linkClick } to="/help" className="nav_submenu_item">Help</Link>
        </section>
        <section className="nav_submenu_section">
          <a
            target="_blank"
            href="https://goo.gl/forms/PyLjAiaJVt3xONsd2"
            rel="noopener noreferrer"
            className="nav_submenu_item"
            onClick={ this.linkClick }
          >
          Send Feedback
          </a>
        </section>
        <section className="nav_submenu_section nav_submenu_section--logout">
          <Link to="/logout" className="nav_submenu_item" onClick={ this.logoutClick }>Logout</Link>
        </section>
      </div>
    );
  }
}

UserProfileMenu.propTypes = {
  toggleMobileNav: PropTypes.func,
  logout: PropTypes.func,
  submenuClosePopup: PropTypes.func,
  user: PropTypes.oneOfType( [PropTypes.object, PropTypes.func] )
};

const mapStateToProps = state => createStructuredSelector( {
  user: makeSelectUser()
} );

export default connect( mapStateToProps, { logout } )( UserProfileMenu );
