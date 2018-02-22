import React, { Component } from 'react';

class DownloadPopup extends Component {  
  render() {  	
  	return(
  	  <div className='downloadPopup'>
        <p className='downloadPopup_title'>{this.props.title}</p>
        {this.props.children}               
      </div>
  	);
  }	
};

export default DownloadPopup;