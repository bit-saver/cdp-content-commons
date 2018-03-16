import React, { Component } from 'react';
import { Popup, Image } from 'semantic-ui-react';
import SharePopupItem from './SharePopupItem';
import cardShareIcon from '../../../assets/images/Card_Share_Icon.svg';

class VideoDownloadPopup extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      popupOpen: false,
      isMobile: false
    };

    this.isMobile = this.isMobile.bind( this );
  }

  componentDidMount() {
    this.isMobile();
  }

  isMobile() {
    if ( window.outerWidth < 768 ) {
      this.setState( { isMobile: true } );
    }
  }

  render() {
    return (
      <span className="card_icon card_icon--share">
        <Popup
          trigger={ <Image src={ cardShareIcon } /> }
          on="click"
          onOpen={ () => {
            this.setState( { popupOpen: true } );
          } }
          onClose={ () => this.setState( { popupOpen: false } ) }
          className={ !this.state.isMobile ? 'popupElem_wrapper' : 'popupElem_wrapper popupElem_wrapper--mobile' }
          content={ <SharePopupItem /> }
        />
        <Hover
          className={ this.state.popupOpen ? 'card_downloadHover hideOnPopup' : 'card_downloadHover' }
          content="Copy the shortcode for this video or share it social platforms."
        />
      </span>
    );
  }
}

export default VideoDownloadPopup;
