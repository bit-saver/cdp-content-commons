import React, { Component } from 'react';

class PopupMenu extends Component {  
  render() {
  	return(
  	  <div>
  	  	<div className='downloadPopup_menu_wrapper'>
  	      <ul className='downloadPopup_menu'>
            {this.props.children}	        
  	      </ul>
  	    </div>
  	    <div className='hover_slider'>      
  	      <hr className='slider' />
  	      <hr className='non_slider' />
  	    </div>
      </div>
  	);
  }
}

export default PopupMenu;