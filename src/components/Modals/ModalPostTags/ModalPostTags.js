import React from 'react';
import { array } from 'prop-types';
import './ModalPostTags.css';

const renderCategory = ( category, index, arr ) => {
  let { name } = category;
  const key = `cat_${index}`;
  if ( index > 2 ) {
    return undefined;
  }
  if ( arr.length - 1 !== index && index < 2 ) {
    name += '  · ';
  }

  return <span key={ key } className="modal_postTag"> { name.toLowerCase() } </span>;
};

const ModalPostTags = ( props ) => {
  const { tags } = props;

  return (
    <section className="modal_section modal_section--postTags">
      { tags && tags.map( renderCategory ) }
    </section>
  );
};

ModalPostTags.propTypes = {
  tags: array
};

export default ModalPostTags;
