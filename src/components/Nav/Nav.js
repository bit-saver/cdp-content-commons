import React from 'react';
import './Nav.css';
import { Menu } from 'semantic-ui-react';

const Nav = () => (
  <nav>
    <Menu compact secondary>
      <Menu.Item>About</Menu.Item>
      <Menu.Item>Help</Menu.Item>
      <Menu.Item>Sign In</Menu.Item>
    </Menu>
  </nav>
);

export default Nav;
