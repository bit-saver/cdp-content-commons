import React from 'react';
import moment from 'moment';
import { string } from 'prop-types';
import './ModalPostMeta.css';

const ModalPostMeta = ( props ) => {
  const {
    author,
    sourcelink,
    logo,
    source,
    datePublished
  } = props;

  let sourceItem = <div />;
  if ( logo && sourcelink ) {
    sourceItem = (
      <a href={ sourcelink } target="_blank">
        <img src={ logo } alt={ source } className="modal_postmeta_logo" />
      </a>
    );
  } else if ( logo ) {
    sourceItem = <img src={ logo } alt={ source } className="modal_postmeta_logo" />;
  } else if ( sourcelink ) {
    sourceItem = (
      <span className="modal_postmeta_content">
        Source: <a href={ sourcelink } target="_blank">{ source }</a>
      </span>
    );
  } else {
    sourceItem = source ? <span className="modal_postmeta_content">Source: { source }</span> : '';
  }

  return (
    <section className="modal_section modal_section--postMeta">
      { sourceItem }
      { author &&
        <span className="modal_postmeta_content">
          { `Author: ${author}` }
        </span>
      }
      <span className="modal_postmeta_content">
        { `Date Published: ${moment( datePublished ).format( 'MMMM DD, YYYY' )}` }
      </span>
    </section>
  );
};

ModalPostMeta.propTypes = {
  author: string,
  sourcelink: string,
  logo: string,
  source: string,
  datePublished: string
};

export default ModalPostMeta;
