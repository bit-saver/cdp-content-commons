import React, { Component } from 'react';
import { object, string } from 'prop-types';
import './PopupElem.css';

class PopupMenuItem extends Component {
  constructor( props ) {
    super( props );
    this.menuItemOnClick = this.menuItemOnClick.bind( this );
    this.setSliderAttrs = this.setSliderAttrs.bind( this );
    this.toggleContentDisplay = this.toggleContentDisplay.bind( this );
    this.getMenuItemAttrs = this.getMenuItemAttrs.bind( this );
  }

  componentDidMount() {
    this.setSliderAttrs( ...this.getMenuItemAttrs() );
  }

  // eslint-disable-next-line class-methods-use-this
  getElement( cls ) {
    return document.querySelector( cls );
  }

  // Adjust Slider width and position on menu click
  setSliderAttrs( itemWidth, itemOffset ) {
    const slider = this.getElement( '.hover_slider .slider' );
    slider.style.width = `${itemWidth + 5}px`;
    slider.style.left = `${itemOffset - 18}px`;
  }

  // Gather clicked Menu Item width & position ||
  // the first Menu Item when first rendered
  getMenuItemAttrs( menuItem ) {
    const item = menuItem ? menuItem.target : this.getElement( '[data-menu-item="1"]' );
    const menuItemAttrs = [];
    const itemWidth = item.clientWidth;
    const itemOffset = item.offsetLeft;

    menuItemAttrs.push( itemWidth, itemOffset );

    return menuItemAttrs;
  }

  // Toggle Content on menu click
  toggleContentDisplay( menuItem ) {
    // remove show class on currently displaying content item
    // add to target content item
    const activeContent = this.getElement( '.popupElem_content_item--show' );
    const targetContent = this.getElement( `[data-content="${menuItem}"` );

    activeContent.classList.remove( 'popupElem_content_item--show' );
    targetContent.classList.add( 'popupElem_content_item--show' );
  }

  menuItemOnClick( e ) {
    console.log( 'clicked' );
    const itemIndex = e.target.dataset.menuItem;
    this.setSliderAttrs( ...this.getMenuItemAttrs( e ) );
    this.toggleContentDisplay( itemIndex );
  }

  render() {
    const { domProps, content } = this.props;
    return (
      // temporarily disable 508 lint warnings
      /* eslint-disable */
      <li {...domProps} onClick={this.menuItemOnClick}>
        {content}
      </li>
      /* eslint-enable */
    );
  }
}

PopupMenuItem.propTypes = {
  domProps: object,
  content: string
};

export default PopupMenuItem;
