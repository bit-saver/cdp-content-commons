import React, { Component } from 'react';

class PopupMenuItem extends Component {
  render() {
  	const { domProps, content } = this.props; 

  	return(  		
  	  <li {...domProps}>{content}</li>  	  
  	);
  }
}

export default PopupMenuItem;