import React from 'react';
import { string } from 'prop-types';
import './ModalTranscript.css';

const ModalTranscript = ( props ) => {
  const { classes } = props;

  return (
    <div className={ classes }>
      <p className="transcript_label">Transcript:</p>
      <div className="transcript_text">
        <p>Transcript text</p>
        <p>Transcript text</p>
        <p>Transcript text</p>
      </div>
    </div>
  );
};

ModalTranscript.propTypes = {
  classes: string
};

export default ModalTranscript;
