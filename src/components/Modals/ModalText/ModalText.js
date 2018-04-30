import React from 'react';
import { string } from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import './ModalText.css';

const ModalText = ( props ) => {
  const { textContent } = props;

  return (
    <section className="modal_section modal_section--textContent">
      <div className="textContent">
        { ReactHtmlParser( textContent ) }
      </div>
    </section>
  );
};

ModalText.propTypes = {
  textContent: string
};

export default ModalText;
