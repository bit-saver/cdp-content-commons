import React, { Component } from 'react';
import { array } from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import './ModalLangDropdown.css';

class ModalLangDropdown extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      isOpen: false
    };

    this.toggleArrow = this.toggleArrow.bind( this );
  }

  toggleArrow() {
    this.setState( { isOpen: !this.state.isOpen } );
  }

  render() {
    const { languages } = this.props;
    return (
      <Dropdown
        className="modal_languages"
        defaultValue="English"
        icon={ this.state.isOpen ? 'chevron up' : 'chevron down' }
        options={ languages }
        onClick={ this.toggleArrow }
        onChange={ this.toggleArrow }
      />
    );
  }
}

ModalLangDropdown.propTypes = {
  languages: array
};

export default ModalLangDropdown;
