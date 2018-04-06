import React, { Component } from 'react';
import { array, string, func } from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import './ModalLangDropdown.css';

class ModalLangDropdown extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      isOpen: false
    };

    this.toggleArrow = this.toggleArrow.bind( this );
    this.handleChange = this.handleChange.bind( this );
  }

  toggleArrow() {
    this.setState( { isOpen: !this.state.isOpen } );
  }

  handleChange( e, { value } ) {
    this.toggleArrow();
    this.props.handleLanguageChange( value );
  }

  render() {
    const { languages } = this.props;
    const { selected } = this.props;
    if ( languages.length > 1 ) {
      return (
        <Dropdown
          className="modal_languages"
          defaultValue={ selected }
          icon={ this.state.isOpen ? 'chevron up' : 'chevron down' }
          options={ languages }
          onClick={ this.toggleArrow }
          onChange={ this.handleChange }
        />
      );
    }
    return <div>{ selected }</div>;
  }
}

ModalLangDropdown.propTypes = {
  languages: array,
  selected: string,
  handleLanguageChange: func
};

export default ModalLangDropdown;
