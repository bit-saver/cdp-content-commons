import React, { Component } from 'react';
import { Popup, Button } from 'semantic-ui-react';
import { string, node, bool, object } from 'prop-types';
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
    if ( window.outerWidth < 600 ) {
      this.setState( { isMobile: true } );
    }
  };

  render() {
    return (
      <span style={ { float: this.props.position, display: this.props.show ? 'inline-block' : 'none' } }>
        <Tooltip content={ this.props.toolTip } styles={ tooltipStyles }>
          <Popup
            trigger={
              <Button className="trigger">
                <img
                  src={ this.props.icon.img }
                  width={ this.props.icon.dim }
                  height={ this.props.icon.dim }
                  alt={ this.props.toolTip }
                />{ ' ' }
              </Button>
            }
            on="click"
            onOpen={ this.handleOnOpen }
            onClose={ this.handleOnClose }
            className={ !this.state.isMobile ? 'popupElem_wrapper' : 'popupElem_wrapper popupElem_wrapper--mobile' }
            content={ this.props.content }
            horizontalOffset={ 4 }
            position={ this.state.isMobile ? 'bottom center' : 'bottom right' }
          />
        </Tooltip>
      </span>
    );
  }
}

PopupTrigger.propTypes = {
  toolTip: string,
  icon: object,
  content: node,
  position: string,
  show: bool
};

export default PopupTrigger;
