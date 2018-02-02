import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import HeaderBarMenu from './HeaderBarMenu';
//import './HeaderBar.css';

import { Header, Input, Button, Dropdown, Form } from 'semantic-ui-react';

const contentTypes = [
  { key: 1, text: 'Article' },
  { key: 2, text: 'Audio' },
  { key: 3, text: 'Course' },
  { key: 4, text: 'Image' },
  { key: 5, text: 'Publication' },
  { key: 6, text: 'Quiz' },
  { key: 7, text: 'Video' }
];

class HeaderBar extends Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    const { value } = this.state;

    return (
      <div style={{ 'marginBottom': '80px', 'borderBottom': '2px solid #000' }}>
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
        
        <div className='search_bar' style={{ 'marginBottom': '30px' }}>          
          <Form>
            <Form.Group>
              <Dropdown         
                icon='chevron down' 
                text='Content Types' 
                selection
                options={contentTypes} 
                className='search_dropdown'
                onChange={this.handleChange}
                value={value}
              />
              <Form.Input placeholder='Search...' className='search_input' />
              <Form.Button icon='search' type='submit' />
            </Form.Group>
          </Form>
        </div>


      </div>
    );
  }
}

export default HeaderBar;
