import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import HeaderBarMenu from './HeaderBarMenu';
//import './HeaderBar.css';

import { Header, Input, Button } from 'semantic-ui-react';

class HeaderBar extends Component {
  render() {
    return (
      <div>
        {/*
        <AppBar
          className="HeaderBar__component"
          title="CDP"
          titleStyle={{ color: 'transparent' }}
          showMenuIconButton={false}
          iconElementRight={<HeaderBarMenu />}
        />
        */}
      
        <Header as='h1' textAlign='center'>
          Content Commons
          <Header.Subheader>Welcome to the Content Commons. Here you can discover, find, and reuse public diplomacy content from U.S. Department of State resources.</Header.Subheader>
        </Header>

        <Button content='Content' primary />
        <Input placeholder='Search...' size='massive' />
      </div>
    );
  }
}

export default HeaderBar;
