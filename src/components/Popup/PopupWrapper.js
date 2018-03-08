import React from 'react';
import { node, string } from 'prop-types';
import './PopupElem.css';

const PopupWrapper = props => (
  <div className="popupElem">
    <p className="popupElem_title">{ props.title }</p>
    { props.children }
  </div>
);

PopupWrapper.propTypes = {
  title: string,
  children: node
};

export default PopupWrapper;
