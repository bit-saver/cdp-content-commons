import React from 'react';
import './Nav.css';
import { Dropdown } from 'semantic-ui-react';

const Nav = () => (
  <nav>
    <Dropdown item simple text="MENU" direction="right">
      <Dropdown.Menu>
        <Dropdown.Item text="About" />
        <Dropdown.Item text="Sign In" />
      </Dropdown.Menu>
    </Dropdown>
  </nav>
);

export default Nav;
