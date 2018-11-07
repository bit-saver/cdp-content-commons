import React from 'react';
import { string } from 'prop-types';
import ModalText from '../ModalText/ModalText';
import './ModalTranscript.css';

const ModalTranscript = ( props ) => {
  const { transcript, classes } = props;

  return (
    <div className={ classes }>
      <div className="transcript_text">
        <ModalText textContent={ transcript } />
      </div>
    </div>
  );
};

ModalTranscript.propTypes = {
  transcript: string,
  classes: string
};

export default ModalTranscript;
