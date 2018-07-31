import React from 'react';
import { string, array } from 'prop-types';
import ClipboardCopy from '../ClipboardCopy/ClipboardCopy';
import './Embed.css';

const Embed = props => (
  <div>
    <div className="form-group_instructions">{ props.instructions }</div>
    <ClipboardCopy label="Embed Code" copyItem="[PROPS.EMBED_CODE]" />
    { props.children }
  </div>
);

Embed.propTypes = {
  instructions: string,
  children: array
};

export default Embed;
