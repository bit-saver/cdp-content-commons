import React, { Component } from 'react';
import { Popup, Image } from 'semantic-ui-react';
import Hover from '../../Hover/Hover';
import DownloadPopup from '../DownloadPopup';
import cardDownloadIcon from '../../../assets/images/Card_Download_Icon.svg';

class VideoDownloadPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popupOpen: false
    }
  }

  render() {
  	return(
  	  <span className='card_icon card_icon--download'>
        <Popup 
          trigger={<Image src={cardDownloadIcon} />}              
          on='click'
          onOpen={ () => this.setState({ popupOpen: true }) }
          onClose={ () => this.setState({ popupOpen: false }) }
          className='downloadPopup_wrapper'
          content={<DownloadPopup title='Download this video.' />}              
        >                            
        </Popup>            
        <Hover className={this.state.popupOpen ? 'card_downloadHover hideOnPopup': 'card_downloadHover'} content='Download this video with an embed code' />
      </span>
  	);
  }
}

export default VideoDownloadPopup;