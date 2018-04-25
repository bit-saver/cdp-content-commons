import React from 'react';
import moment from 'moment';
import { string } from 'prop-types';
import './ModalPostMeta.css';

const ModalPostMeta = ( props ) => {
  const {
    type,
    author,
    sourcelink,
    logo,
    source,
    datePublished
  } = props;

  let sourceItem = <div />;
  if ( logo ) {
    sourceItem = <img src={ logo } alt={ source } className="modal_postmeta_logo" />;
  } else if ( sourcelink ) {
    sourceItem = (
      <span className="modal_postmeta_content">
        Source: <a href={ sourcelink } target="_blank">{ source }</a>
      </span>
    );
  } else {
    sourceItem = <span className="modal_postmeta_content">Source: { source }</span>;
  }

  return (
    <section className="modal_section modal_section--postMeta">
      { sourceItem }
      { author &&
        <span className="modal_postmeta_content">
          { `Author: ${author}` }
        </span>
      }
      { type === 'video' && <span className="modal_postmeta_content">Owner: IIP, Office of Video Production</span> }
      { type === 'post' && <span className="modal_postmeta_content">Owner: IIP, Office of Editorial Content</span> }
      <span className="modal_postmeta_content">
        { `Date Published: ${moment( datePublished ).format( 'MMMM DD, YYYY' )}` }
      </span>
    </section>
  );
};

ModalPostMeta.propTypes = {
  type: string,
  author: string,
  sourcelink: string,
  logo: string,
  source: string,
  datePublished: string
};

export default ModalPostMeta;
