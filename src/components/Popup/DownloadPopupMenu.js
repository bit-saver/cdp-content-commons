import React, { Component } from 'react';
import PopupMenuItem from './DownloadPopupMenuItem';

class PopupMenu extends Component {
  constructor(props) {
    super(props);
    this.menuItemOnClick = this.menuItemOnClick.bind(this);
    this.setSliderAttrs = this.setSliderAttrs.bind(this);
    this.toggleContentDisplay = this.toggleContentDisplay.bind(this);
    this.getMenuItemAttrs = this.getMenuItemAttrs.bind(this);
  }

  componentDidMount() {
    this.setSliderAttrs(...this.getMenuItemAttrs());
  }

  menuItemOnClick(e) {        
    const itemIndex = e.target.dataset.menuItem;
    this.setSliderAttrs(...this.getMenuItemAttrs(e));    
    this.toggleContentDisplay(itemIndex);
  }

  // Adjust Slider width and position on menu click
  setSliderAttrs(itemWidth, itemOffset) {
    const slider = document.querySelector('.hover_slider .slider');
    slider.style.width = `${itemWidth + 5}px`;
    slider.style.left = `${itemOffset - 18}px`; 
  }

  // Toggle Content on menu click
  toggleContentDisplay(menuItem) {
    // remove show class on currently displaying content item
    // add to target content item
    const 
      activeContent = document.querySelector('.downloadPopup_content_item--show'),
      targetContent = document.querySelector(`[data-content="${menuItem}"`);      
      
      activeContent.classList.remove('downloadPopup_content_item--show');
      targetContent.classList.add('downloadPopup_content_item--show');
  }

  // Gather clicked Menu Item width & position ||
  // the first Menu Item when first rendered
  getMenuItemAttrs(menuItem) {
    const 
      item = menuItem ? menuItem.target : document.querySelector('[data-menu-item="1"]'),
      menuItemAttrs = [],
      itemWidth = item.clientWidth,
      itemOffset = item.offsetLeft;

    menuItemAttrs.push(itemWidth, itemOffset);

    return menuItemAttrs;
  }

  render() {
  	return(
  	  <div>
  	  	<div className='downloadPopup_menu_wrapper'>
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