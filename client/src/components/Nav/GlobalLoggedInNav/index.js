/**
 *
 * LoggedInNav
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Responsive, Popup, Icon } from 'semantic-ui-react';
import uploadIcon from 'assets/icons/icon_upload.svg';
import notifyIcon from 'assets/icons/icon_notifications.svg';
import userIcon from 'assets/icons/icon_user_profile.svg';
import UserProfileMenu from 'containers/Admin/Menus/UserProfile';
import NotificationsMenu from 'containers/Admin/Menus/Notifications';

const menuItems = [
  {
    key: 1,
    name: 'upload',
    icon: uploadIcon,
    width: 34,
    height: 34,
    alt: 'Upload content'
  },
  {
    key: 2,
    name: 'notifications',
    icon: notifyIcon,
    width: 30,
    height: 30,
    alt: 'View notifications'
  },
  {
    key: 3,
    name: 'user_profile',
    icon: userIcon,
    width: 26,
    height: 26,
    alt: 'View user profile'
  }
];

class LoggedInNav extends Component {
  state = {
    user_profile: false,
    notifications: false
  }

  getIcon = item => (
    <img src={ item.icon } width={ item.width } height={ item.height } alt={ item.alt } />
  )

  displayPopup = ( e, data ) => {
    this.setState( { [data.id]: true } );
  }

  closePopup = ( e, data ) => {
    this.setState( { [data.id]: false } );
  }

  submenuClosePopup = () => {
    this.setState( {
      user_profile: false,
      notifications: false
    } );
  }

  renderMenu( menu ) {
    const { toggleMobileNav } = this.props;
    if ( menu === 'notifications' ) {
      return <NotificationsMenu submenuClosePopup={ this.submenuClosePopup } toggleMobileNav={ toggleMobileNav } />;
    }
    return <UserProfileMenu submenuClosePopup={ this.submenuClosePopup } toggleMobileNav={ toggleMobileNav } />;
  }

  render() {
    const { mobileNavVisible, toggleMobileNav, keyUp } = this.props;

    return (
      <span>
        <Responsive as={ Menu } compact secondary minWidth={ 993 }>
          {

            menuItems.map( ( item ) => {
              if ( item.name === 'upload' ) {
                return (
                  <Menu.Item key={ item.key } name={ item.name } className="nav_loggedin">
                    <Link to="/admin/upload">{ this.getIcon( item ) }</Link>
                  </Menu.Item>
                );
              }

              return (
                <Popup
                  key={ item.key }
                  id={ item.name }
                  className="nav_submenu_popup"
                  trigger={
                    <Menu.Item key={ item.key } name={ item.name } className="nav_loggedin">
                      { this.getIcon( item ) }
                    </Menu.Item>
                  }
                  content={
                    item.name === 'notifications'
                    ? <NotificationsMenu submenuClosePopup={ this.submenuClosePopup } />
                    : <UserProfileMenu submenuClosePopup={ this.submenuClosePopup } />
                  }
                  on="click"
                  open={ this.state[`${item.name}`] }
                  onOpen={ this.displayPopup }
                  onClose={ this.closePopup }
                  position="bottom center"
                />
              );
            } )
          }
          <a
            href="https://goo.gl/forms/9cJ3IBHH9QTld2Mj2"
            target="_blank"
            className="item feedback"
            rel="noopener noreferrer"
          >
            Feedback
          </a>
        </Responsive>

        {
          mobileNavVisible &&
          <Responsive maxWidth={ 992 }>
            <ul className="mobileMenu">
              <li>
                <Icon name="close" onClick={ toggleMobileNav } onKeyUp={ keyUp } tabIndex={ 0 } />
              </li>
              { menuItems.map( ( item ) => {
                if ( item.name === 'upload' ) {
                  return (
                    <li key={ item.key }>
                      <Link to="/admin/upload" onClick={ toggleMobileNav }>{ this.getIcon( item ) }</Link>
                    </li>
                  );
                }
                return (
                  <Popup
                    key={ item.key }
                    className="nav_submenu_popup"
                    trigger={ <li key={ item.key }>{ this.getIcon( item ) }</li> }
                    content={ this.renderMenu( item.name ) }
                    on="click"
                    open={ this.state.popupIsOpen }
                    onOpen={ this.displayPopup }
                    onClose={ this.closePopup }
                    position="bottom center"
                  />
                );
              } ) }
              <li>
                <a
                  href="https://goo.gl/forms/PyLjAiaJVt3xONsd2"
                  target="_blank"
                  className="item feedback"
                  rel="noopener noreferrer"
                  onClick={ toggleMobileNav }
                >
                  Feedback
                </a>
              </li>
            </ul>
          </Responsive>
        }
      </span>
    );
  }
}

LoggedInNav.propTypes = {
  mobileNavVisible: PropTypes.bool,
  toggleMobileNav: PropTypes.func,
  keyUp: PropTypes.func
};

export default LoggedInNav;
