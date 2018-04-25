import React, { Component } from 'react';
import { func, string, array, object } from 'prop-types';
import { Form, Icon } from 'semantic-ui-react';
import './FilterMenuItem.css';

class FilterMenuItem extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      value: this.props.default || '',
      filterItemOpen: false
    };
  }

  displayFilter = () => {
    this.setState( { filterItemOpen: true }, () => {
      document.addEventListener( 'click', this.closeFilter );
    } );
  };

  toggleSubMenu = ( e ) => {
    const optionHasSubMenu = e.target.parentNode.dataset.submenu;
    if ( optionHasSubMenu === 'true' ) {
      this.setState( { filterItemOpen: false } );
      // Toggle filterMenu subMenuActive class (blue background)
      this.filterMenu.classList.add( 'subMenuActive' );
    } else {
      this.filterMenu.classList.remove( 'subMenuActive' );
    }
  };

  closeFilter = ( e ) => {
    const activeSubMenu = document.querySelector( '.filterMenu_sub.show' );

    if ( !this.filterMenu.contains( e.target ) || e.target.classList.contains( 'filterMenu_label' ) ) {
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
  };

  handleOnChange = ( e, selected ) => {
    this.setState( { value: selected.value } );
    this.props.onFilterChange( selected );

    this.toggleSubMenu( e );
  };

  renderOptions = () => {
    if ( !this.props.options.length ) {
      return;
    }

    const { options, children, selected } = this.props;
    const child = React.Children.only( children );
    const { name } = child.type._meta;

    return options.map( option =>
      React.cloneElement( child, {
        key: option.value,
        // label: option.count ? `${option.label} (${option.count})` : option.label,
        label: option.label,
        labelclean: option.label,
        value: option.value,
        count: option.count,
        filter: this.props.filter,
        onChange: this.handleOnChange,
        checked:
          name === 'FormRadio'
            ? this.state.value === option.value
            : selected.some( sel => sel.display_name === option.label )
      } ) );
  };

  render() {
    const { filterItemOpen } = this.state;

    return (
      <div
        className="filterMenu"
        ref={ ( filterMenu ) => {
          this.filterMenu = filterMenu;
        } }
      >
        <span
          className={ filterItemOpen ? 'filterMenu_label active' : 'filterMenu_label' }
          onClick={ this.displayFilter }
          onKeyDown={ this.displayFilter }
          role="menuitem"
          tabIndex={ 0 }
        >
          { this.props.filter } <Icon name={ filterItemOpen ? 'chevron up' : 'chevron down' } />
        </span>
        <Form className={ filterItemOpen ? 'filterMenu_options show' : 'filterMenu_options' }>
          <Form.Group>{ this.renderOptions() }</Form.Group>
        </Form>
      </div>
    );
  }
}

FilterMenuItem.propTypes = {
  options: array,
  children: object,
  filter: string,
  default: string,
  selected: array,
  onFilterChange: func,
  closeSubMenu: func
};

export default FilterMenuItem;
