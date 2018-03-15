import React, { Component } from 'react';
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
    console.log( e.target );

    this.setState( { value } );
    this.props.updateIsChecked();

    const optionHasSubMenu = e.target.parentNode.dataset.submenu;
    if ( optionHasSubMenu === 'true' ) {
      this.setState( { filterItemOpen: false } );
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
        }
      } );
    }
  }

  render() {
    const { value } = this.state;

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
                checked={ value === opt.optionValue }
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
                checked={ this.props.isChecked }
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

export default FilterMenuItem;
