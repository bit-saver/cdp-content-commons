import React from 'react';
import { string } from 'prop-types';
import './ModalText.css';

const ModalText = ( props ) => {
  const { textContent } = props;
  const textContentWrapper = document.createElement( 'div' );
  textContentWrapper.innerHTML = textContent;

  return (
    <section className="modal_section modal_section--textContent">
      <div className="textContent" ref={ ( node ) => { if ( node ) node.appendChild( textContentWrapper ); } } />
    </section>
  );
};

ModalText.propTypes = {
  textContent: string
};

export default ModalText;
