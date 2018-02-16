import React, { Component } from 'react';
import PopupMenuItem from './DownloadPopupMenuItem';
import { getMenuItemAttrs, setSliderAttrs, toggleContentDisplay } from './helpers';

class PopupMenu extends Component {
  constructor(props) {
    super(props);
    this.menuItemOnClick = this.menuItemOnClick.bind(this);
  }

  menuItemOnClick(e) {        
    const itemIndex = e.target.dataset.menuItem;
    setSliderAttrs(...getMenuItemAttrs(e));    
    toggleContentDisplay(itemIndex);
  }

  componentDidMount() {
    setSliderAttrs(...getMenuItemAttrs());
  }

  render() {
  	return(
  	  <div>
  	  	<div className='downloadPopup_menu_wrapper test'>
  	      <ul className='downloadPopup_menu'>
            <PopupMenuItem 
              domProps={{className: 'downloadPopup_menu_item', 'data-menu-item': '1', onClick: this.menuItemOnClick}} 
              content='Closed Captions'
            />
            <PopupMenuItem 
              domProps={{className: 'downloadPopup_menu_item', 'data-menu-item': '2', onClick: this.menuItemOnClick}} 
              content='Open Captions'
            />
            <PopupMenuItem 
              domProps={{className: 'downloadPopup_menu_item', 'data-menu-item': '3', onClick: this.menuItemOnClick}} 
              content='More'
            />
            <PopupMenuItem 
              domProps={{className: 'downloadPopup_menu_item downloadPopup_menu_item--last', 'data-menu-item': '4', onClick: this.menuItemOnClick}} 
              content='Help'
            />	        
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