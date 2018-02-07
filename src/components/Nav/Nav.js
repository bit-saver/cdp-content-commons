import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

class Nav extends Component {
  render() {
    return(
    <div>
      <Dropdown text='MENU' className='nav'>
        <Dropdown.Menu>
          <Dropdown.Item text='Menu Item' />
          <Dropdown.Item text='Sign In' />
        </Dropdown.Menu>
      </Dropdown>
     </div>
    );
  }
}

export default Nav;