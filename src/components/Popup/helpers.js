// Adjust Slider width and position on menu click
export const setSliderAttrs = (itemWidth, itemOffset) => {
  const slider = document.querySelector('.hover_slider .slider');
  slider.style.width = `${itemWidth + 5}px`;
  slider.style.left = `${itemOffset - 18}px`; 
}

// Toggle Content on menu click
export const toggleContentDisplay = menuItem => {
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
export const getMenuItemAttrs = menuItem => {
  const 
    item = menuItem ? menuItem.target : document.querySelector('[data-menu-item="1"]'),
    menuItemAttrs = [],
  	itemWidth = item.clientWidth,
  	itemOffset = item.offsetLeft;

  menuItemAttrs.push(itemWidth, itemOffset);

  return menuItemAttrs;
}