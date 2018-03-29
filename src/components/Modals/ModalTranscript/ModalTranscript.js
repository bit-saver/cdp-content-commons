import React from 'react';
import { string } from 'prop-types';
import './ModalTranscript.css';

const ModalTranscript = ( props ) => {
  const { transcript, classes } = props;

  return (
    <div className={ classes }>
      <p className="transcript_label">Transcript:</p>
      <div className="transcript_text">
        { transcript }

        { /* TEMP */ }
        <p>Transcript text</p>
        <p>Transcript text</p>
        <p>Transcript text</p>
      </div>
    </div>
  );
};

ModalTranscript.propTypes = {
  transcript: string,
  classes: string
};

export default ModalTranscript;
