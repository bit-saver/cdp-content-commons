import React, { Component } from 'react';
import { Popup } from 'semantic-ui-react';
import { string, node, bool } from 'prop-types';
import { Tooltip } from 'react-lightweight-tooltip';
import tooltipStyles from '../../utils/tooltip';

class PopupTrigger extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      isMobile: false
    };
  }

  componentDidMount() {
    this.isMobile();
  }

  isMobile = () => {
    if ( window.outerWidth < 768 ) {
      this.setState( { isMobile: true } );
    }
  };

  render() {
    return (
      <span style={ { float: this.props.position, display: this.props.show ? 'inline-block' : 'none' } }>
        <Tooltip content={ this.props.toolTip } styles={ tooltipStyles }>
          <Popup
            trigger={ <img src={ this.props.icon } width="18" height="18" alt="Download video" /> }
            on="click"
            onOpen={ this.handleOnOpen }
            onClose={ this.handleOnClose }
            className={ !this.state.isMobile ? 'popupElem_wrapper' : 'popupElem_wrapper popupElem_wrapper--mobile' }
            content={ this.props.content }
          />
        </Tooltip>
      </span>
    );
  }
}

PopupTrigger.propTypes = {
  toolTip: string,
  icon: string,
  content: node,
  position: string,
  show: bool
};

export default PopupTrigger;
