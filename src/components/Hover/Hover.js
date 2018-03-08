import React from 'react';
import { string } from 'prop-types';
import './Hover.css';

const Hover = props => (
  <div className={ props.className }>
    <p>{ props.content }</p>
  </div>
);

Hover.propTypes = {
  className: string,
  content: string
};

export default Hover;
