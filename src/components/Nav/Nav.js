import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import Search from '../Search';
import Title from '../Title';

const Nav = () => (
  <section>
    <Menu className="nav" borderless stackable>
      <Menu.Item className="nav__title">
        <Title />
      </Menu.Item>
      <Menu.Item className="nav__search">
        <Search />
      </Menu.Item>
      <Menu.Item position="right" className="nav__menu">
        <Dropdown item simple text="MENU" direction="right">
          <Dropdown.Menu>
            <Dropdown.Item text="About" />
            <Dropdown.Item text="Sign In" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Menu>
  </section>
);

export default Nav;
