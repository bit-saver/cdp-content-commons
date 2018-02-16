import React, { Component } from 'react';
import PopupMenu from './DownloadPopupMenu';
import PopupContent from './DownloadPopupContent';

class DownloadPopup extends Component {  
  render() {
  	return(
  	  <div className='downloadPopup'>
        <p className='downloadPopup_title'>{this.props.title}</p>
        
        <PopupMenu />        
        <PopupContent />
      </div>
  	);
  }	
};

export default DownloadPopup;