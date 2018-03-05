import React, { Component } from 'react';
import { Popup, Image } from 'semantic-ui-react';
import Hover from '../../Hover/Hover';
import DownloadPopupItem from './DownloadPopupItem';
import cardDownloadIcon from '../../../assets/images/Card_Download_Icon.svg';

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
      <span className="card_icon card_icon--download">
        <Popup
          trigger={ <Image src={ cardDownloadIcon } /> }
          on="click"
          onOpen={ () => {
            this.setState( { popupOpen: true } );
          } }
          onClose={ () => this.setState( { popupOpen: false } ) }
          className={
            !this.state.isMobile
              ? 'popupElem_wrapper'
              : 'popupElem_wrapper popupElem_wrapper--mobile'
          }
          content={ <DownloadPopupItem /> }
        />
        <Hover
          className={ this.state.popupOpen ? 'card_downloadHover hideOnPopup' : 'card_downloadHover' }
          content="Download this video with an embed code"
        />
      </span>
    );
  }
}

export default VideoDownloadPopup;
