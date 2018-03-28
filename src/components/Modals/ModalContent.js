import React from 'react';
import { node, string } from 'prop-types';
import './ModalContent.css';

const ModalContent = ( props ) => {
  const { headline } = props;

  return (
    <div className="modal">
      <h1 className="modal_headline">{ headline }</h1>
      { props.children }
    </div>
  );
};

ModalContent.propTypes = {
  headline: string,
  children: node
};

export default ModalContent;
