/**
 *
 * TableMenu
 *
 */

import React from 'react';
import { Grid, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './TableMenu.css';

class TableMenu extends React.Component {
  state = {
    displayTableMenu: false,
  }
  
  componentDidMount(){
    document.addEventListener( 'click', this.toggleTableMenu, false );
  }

  componentWillUnmount(){
    document.removeEventListener( 'click', this.toggleTableMenu, false );
  }

  toggleTableMenu = e => {
    const isTableMenu = e.target.dataset.tablemenu;
    const isTableMenuItem = e.target.parentNode.dataset.tablemenuitem;

    if ( isTableMenu ) {
      return this.setState( prevState => ({ displayTableMenu: !prevState.displayTableMenu }) );
    }

    if ( isTableMenuItem ) {
      return this.setState( prevState => ({ displayTableMenu: true }) );
    }

    this.setState( prevState => ({ displayTableMenu: false }) );
  }

  render() {
    const { displayTableMenu } = this.state;
    const { columnMenu, tableMenuOnChange } = this.props;

    return (
      <Grid.Column floated='right' width={ 8 } className="items_menu_wrapper">
        <div className="items_menu">
          <span data-tablemenu>See More &#9660;</span>
          <div className={ displayTableMenu ? 'items_menu_list display' : 'items_menu_list' }>
            { columnMenu.map( item => (
              <Checkbox data-tablemenuitem key={ item } onChange={ tableMenuOnChange } label={ item } />
            ) ) }
          </div>
        </div>
      </Grid.Column>
    );
  }
}

TableMenu.propTypes = {
  columnMenu: PropTypes.array,
  tableMenuOnChange: PropTypes.func
};

export default TableMenu;
