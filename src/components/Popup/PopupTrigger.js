import React, { Component } from 'react';
import { Popup, Button } from 'semantic-ui-react';
import { string, node, bool, object } from 'prop-types';
import '../../assets/styles/tooltip.css';

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

  componentWillUnmount() {
    this.removePopupPointerCSS();
  }

  isMobile = () => {
    if ( window.outerWidth < 600 ) {
      this.setState( { isMobile: true } );
    }
  };

  popupPointerPosition = ( e ) => {
    if ( !this.state.isMobile ) return;

    let btnElem;
    if ( e.target.src ) {
      btnElem = e.target.parentNode;
    } else {
      btnElem = e.target;
    }

    const btnLeftPos = Math.round( btnElem.getBoundingClientRect().left );
    const btnWidth = Math.round( btnElem.getBoundingClientRect().width );
    const head = document.head || document.getElementsByTagName( 'head' )[0];
    const pointerCSS = document.createElement( 'style' );
    pointerCSS.type = 'text/css';
    pointerCSS.id = 'popupPointerCSS';
    pointerCSS.innerHTML = `
      .ui.bottom.right.popup.popupElem_wrapper--mobile:before {
        left: ${btnLeftPos - Math.round( btnWidth / 5 )}px !important;
        right: auto;
      }
    `;

    head.appendChild( pointerCSS );
  }

  removePopupPointerCSS = () => {
    const pointerCSS = document.getElementById( 'popupPointerCSS' ) || null;
    if ( pointerCSS ) pointerCSS.parentNode.removeChild( pointerCSS );
  }

  render() {
    // const trigger = withTooltip( <Button>my button </Button> );
    return (
      <span style={ { display: this.props.show ? 'inline-block' : 'none' } }>
        <Popup
          trigger={
            <Button
              className="trigger"
              tooltip={ this.props.toolTip }
            >
              <img
                src={ this.props.icon.img }
                width={ this.props.icon.dim }
                height={ this.props.icon.dim }
                alt={ this.props.toolTip }
              />
            </Button>
          }
          on="click"
          onOpen={ this.popupPointerPosition }
          onClose={ this.removePopupPointerCSS }
          className={ !this.state.isMobile ? 'popupElem_wrapper' : 'popupElem_wrapper popupElem_wrapper--mobile' }
          content={ this.props.content }
          position="bottom right"
        />
      </span>
    );
  }
}

PopupTrigger.propTypes = {
  toolTip: string,
  icon: object,
  content: node,
  show: bool
};

export default PopupTrigger;

