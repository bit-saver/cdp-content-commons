import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const Nav = () => (
  <section>
    <Dropdown text="MENU" className="nav">
      <Dropdown.Menu>
        <Dropdown.Item text="Menu Item" />
        <Dropdown.Item text="Sign In" />
      </Dropdown.Menu>
    </Dropdown>
  </section>
);

export default Nav;
