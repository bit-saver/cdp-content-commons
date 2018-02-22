import React, { Component } from 'react';
import { Popup, Image } from 'semantic-ui-react';
import Hover from '../../Hover/Hover';
import DownloadPopup from '../DownloadPopup';
import VidPopup from './TestPopup.js';
import cardDownloadIcon from '../../../assets/images/Card_Download_Icon.svg';

class VideoDownloadPopup extends Component {
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

  componentDidMount() {
    this.isMobile();
  }

  render() {
  	return(
  	  <span className='card_icon card_icon--download'>
        <Popup 
          trigger={<Image src={cardDownloadIcon} />}              
          on='click'
          onOpen={ (e) => {            
            this.setState({ popupOpen: true });            
          }}          
          onClose={ () => this.setState({ popupOpen: false }) }          
          className={!this.state.isMobile ? 'downloadPopup_wrapper' : 'downloadPopup_wrapper downloadPopup_wrapper--mobile'}
          content={<VidPopup />}          
        >                            
        </Popup>            
        <Hover className={this.state.popupOpen ? 'card_downloadHover hideOnPopup': 'card_downloadHover'} content='Download this video with an embed code' />
      </span>
  	);
  }
}

export default VideoDownloadPopup;