import React, { Component } from 'react';
//import AppBar from 'material-ui/AppBar';
//import HeaderBarMenu from './HeaderBarMenu';
//import './HeaderBar.css';

import { Header } from 'semantic-ui-react';

class HeaderItem extends Component {
  render() {
    return (
      <section>
        {/*
        <AppBar
          className="HeaderBar__component"
          title="CDP"
          titleStyle={{ color: 'transparent' }}
          showMenuIconButton={false}
          iconElementRight={<HeaderBarMenu />}
        />
        */}
      
        <Header as='h1' textAlign='center' className='title'>
          Content Commons
          <Header.Subheader className='subtitle'>Welcome to the Content Commons. Here you can discover, find, and reuse public diplomacy content from U.S. Department of State resources.</Header.Subheader>
        </Header>        

      </section>
    );
  }
}

export default HeaderItem;
