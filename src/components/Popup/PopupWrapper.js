import React, { Component } from 'react';

class PopupWrapper extends Component {  
  render() {  	
  	return(
  	  <div className='popupElem'>
        <p className='popupElem_title'>{this.props.title}</p>
        {this.props.children}               
      </div>
  	);
  }	
};

export default PopupWrapper;