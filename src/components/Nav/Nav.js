import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { Menu } from 'semantic-ui-react';

const Nav = () => (
  <nav>
    <Menu compact secondary>
      <Menu.Item as={ Link } name="about" to="about">About</Menu.Item>
      <Menu.Item>Help</Menu.Item>
      { /* <Menu.Item>Sign In</Menu.Item> */ }
    </Menu>
  </nav>
);

export default Nav;
