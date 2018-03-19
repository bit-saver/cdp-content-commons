import React, { Component } from 'react';
import { func, string, array, bool } from 'prop-types';
import { Form, Icon } from 'semantic-ui-react';
import './FilterMenuItem.css';

class FilterMenuItem extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      value: '',
      filterItemOpen: false
    };

    this.handleOnChange = this.handleOnChange.bind( this );
    this.displayFilter = this.displayFilter.bind( this );
    this.closeFilter = this.closeFilter.bind( this );
  }

  handleOnChange( e, { value } ) {
    this.setState( { value } );

    const optionHasSubMenu = e.target.parentNode.dataset.submenu;
    if ( optionHasSubMenu === 'true' ) {
      this.setState( { filterItemOpen: false } );
      // Toggle filterMenu subMenuActive class (blue background)
      this.filterMenu.classList.add( 'subMenuActive' );
    } else {
      this.filterMenu.classList.remove( 'subMenuActive' );
    }
  }

  displayFilter() {
    this.setState( { filterItemOpen: true }, () => {
      document.addEventListener( 'click', this.closeFilter );
    } );
  }

  closeFilter( e ) {
    const activeSubMenu = document.querySelector( '.filterMenu_sub.show' );

    if ( !this.filterMenu.contains( e.target ) ) {
      this.setState( { filterItemOpen: false }, () => {
        document.removeEventListener( 'click', this.closeFilter );

        // Close any filter sub menus if click target is NOT a submenu
        if ( activeSubMenu && !activeSubMenu.contains( e.target ) ) {
          this.props.closeSubMenu();

          // Remove any filterMenus w/ subMenuActive class
          const filterSubMenuActive = document.querySelector( '.filterMenu.subMenuActive' );
          if ( filterSubMenuActive ) {
            filterSubMenuActive.classList.remove( 'subMenuActive' );
          }
        }
      } );
    }
  }

  render() {
    const { value } = this.state;
    const { filterSelections } = this.props;

    return (
      <div className="filterMenu" ref={ ( filterMenu ) => { this.filterMenu = filterMenu; } }>
        <span
          className={ this.state.filterItemOpen ? 'filterMenu_label active' : 'filterMenu_label' }
          onClick={ this.displayFilter }
          onKeyDown={ this.displayFilter }
          role="menuitem"
          tabIndex={ 0 }
        >
          { this.props.menuName } <Icon name="chevron up" />
        </span>
        <Form className={ this.state.filterItemOpen ? 'filterMenu_options show' : 'filterMenu_options' }>
          <Form.Group>
            { !this.props.useCheckbox && this.props.menuOptions.map( opt => (
              <Form.Radio
                key={ opt.optionValue }
                label={ opt.optionLabel }
                value={ opt.optionValue }
                checked={
                  value === opt.optionValue
                  && filterSelections.some( sel => opt.optionValue === sel.selectionValue )
                }
                onChange={ this.handleOnChange }
                onClick={ this.props.handleFilterSelect }
                data-submenu={ opt.hasSubMenu }
              />
            ) ) }
            { this.props.useCheckbox && this.props.menuOptions.map( opt => (
              <Form.Checkbox
                key={ opt.optionValue }
                label={ opt.optionLabel }
                value={ opt.optionValue }
                checked={ filterSelections.some( sel => opt.optionValue === sel.selectionValue ) }
                onChange={ this.handleOnChange }
                onClick={ this.props.handleFilterSelect }
                data-submenu={ opt.hasSubMenu }
              />
            ) ) }
          </Form.Group>
        </Form>
      </div>
    );
  }
}

FilterMenuItem.propTypes = {
  closeSubMenu: func,
  menuName: string,
  useCheckbox: bool,
  menuOptions: array,
  filterSelections: array,
  handleFilterSelect: func
};

export default FilterMenuItem;
