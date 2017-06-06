import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import HeaderBarMenu from './HeaderBarMenu';
import './HeaderBar.css';

class HeaderBar extends Component {
  render() {
    return (
      <AppBar
        className="HeaderBar__component"
        title="CDP"
        titleStyle={{ color: 'transparent' }}
        showMenuIconButton={false}
        iconElementRight={<HeaderBarMenu />}
      />
    );
  }
}

export default HeaderBar;
