import React from 'react';
import { string, array } from 'prop-types';
import ClipboardCopy from '../ClipboardCopy/ClipboardCopy';
import './Embed.css';

const Embed = ( props ) => {
  const embedItem = props.embedItem ? props.embedItem : '';
  return (
    <div>
      <div className="form-group_instructions">{ props.instructions }</div>
      <ClipboardCopy label="Embed Code" copyItem={ embedItem } />
      { props.children }
    </div>
  );
};

Embed.propTypes = {
  instructions: string,
  children: array,
  embedItem: string
};

export default Embed;
