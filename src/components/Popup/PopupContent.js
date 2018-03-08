import React from 'react';
import { node } from 'prop-types';
import './PopupElem.css';

const PopupContent = props => <div className="popupElem_content">{ props.children }</div>;

PopupContent.propTypes = {
  children: node
};
export default PopupContent;
