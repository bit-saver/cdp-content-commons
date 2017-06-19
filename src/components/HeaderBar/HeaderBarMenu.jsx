import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


class HeaderBarMenu extends Component {
  constructor(props) {
    super(props);
    this.handleTwitterClick = this.handleTwitterClick.bind(this);
  }
  handleTwitterClick(e) {
    e.preventDefault();
    window.location.href = 'https://twitter.com/iipstate';
  }
  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon color="white" /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem
          primaryText="Follow us @IIPState"
          onTouchTap={this.handleTwitterClick}
        />
      </IconMenu>
    );
  }
}

export default HeaderBarMenu;
