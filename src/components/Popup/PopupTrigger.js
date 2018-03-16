import React, { Component } from 'react';
import { Popup, Icon } from 'semantic-ui-react';
import ReactTooltip from 'react-tooltip';
import { string, node } from 'prop-types';

class PopupTrigger extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      popupOpen: false,
      isMobile: false
    };
  }

  componentDidMount() {
    this.isMobile();
  }

  handleOnOpen = () => {
    this.setState( { popupOpen: true } );
    ReactTooltip.hide();
  };

  handleOnClose = () => {
    this.setState( { popupOpen: false } );
  };

  isMobile = () => {
    // if ( window.outerWidth < 768 ) {
    //   this.setState( { isMobile: true } );
    // }
  };

  render() {
    return (
      <span
        data-tip={ this.props.toolTip }
        data-tip-disable={ this.state.popupOpen }
        style={ { float: this.props.position } }
      >
        <Popup
          trigger={ <Icon name={ this.props.icon } size="large" color="blue" /> }
          on="click"
          onOpen={ this.handleOnOpen }
          onClose={ this.handleOnClose }
          className={ !this.state.isMobile ? 'popupElem_wrapper' : 'popupElem_wrapper popupElem_wrapper--mobile' }
          content={ this.props.content }
        />
        <ReactTooltip multiline place="bottom" />
      </span>
    );
  }
}

PopupTrigger.propTypes = {
  toolTip: string,
  icon: string,
  content: node,
  position: string
};

export default PopupTrigger;
