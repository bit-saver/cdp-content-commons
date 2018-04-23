import React from 'react';
import { node, string } from 'prop-types';
import './ModalItem.css';

const ModalItem = ( props ) => {
  const { headline } = props;

  return (
    <div className="modal">
      <h1 className="modal_headline">{ headline }</h1>
      { props.children }
    </div>
  );
};

ModalItem.propTypes = {
  headline: string,
  children: node
};

export default ModalItem;
