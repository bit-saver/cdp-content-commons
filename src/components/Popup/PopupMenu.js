import React from 'react';
import { node } from 'prop-types';
import './PopupElem.css';

const PopupMenu = props => (
  <div>
    <div className="popupElem_menu_wrapper">
      <ul className="popupElem_menu">{ props.children }</ul>
    </div>
    <div className="hover_slider">
      <hr className="slider" />
      <hr className="non_slider" />
    </div>
  </div>
);

PopupMenu.propTypes = {
  children: node
};

export default PopupMenu;
