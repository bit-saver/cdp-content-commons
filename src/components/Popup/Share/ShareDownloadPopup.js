import React, { Component } from 'react';
import { Popup, Image } from 'semantic-ui-react';
import Hover from '../../Hover/Hover';
import DownloadPopup from '../DownloadPopup';
import cardShareIcon from '../../../assets/images/Card_Share_Icon.svg';

class ShareDownloadPopup extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
      popupOpen: false,
      isMobile: false
    }

    this.isMobile = this.isMobile.bind(this);
  }

  isMobile() {
    if( window.outerWidth < 768 ) {
      this.setState({ isMobile: true });
    }
  }

  render() {
    return(
      <span className='card_icon card_icon--share'>          
        <Popup
          trigger={<Image src={cardShareIcon} />}
          on='click'
          content='Share Stuff'
          onOpen={ (e) => {            
            this.setState({ popupOpen: true });            
          }}          
          onClose={ () => this.setState({ popupOpen: false }) }
          className={!this.state.isMobile ? 'downloadPopup_wrapper' : 'downloadPopup_wrapper downloadPopup_wrapper--mobile'}
          content={<DownloadPopup title='How would you like to share this video?' />}
        >          
        </Popup>
      </span>      
    );
  }
}

export default ShareDownloadPopup;