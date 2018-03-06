import React from 'react';
import './Nav.css';
import { Menu } from 'semantic-ui-react';
import Search from '../Search';
import Title from '../Title';

const Nav = () => (
  <section>
    <Menu className="nav" borderless>
      <Menu.Item>
        <Title />
      </Menu.Item>
      <Menu.Item>
        <Search />
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item name="about">
          About
        </Menu.Item>
        <Menu.Item name="signin">
          Sign In
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  </section>
);

export default Nav;
