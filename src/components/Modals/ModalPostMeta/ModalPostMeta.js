import React from 'react';
import moment from 'moment';
import { string } from 'prop-types';
import './ModalPostMeta.css';

const ModalPostMeta = ( props ) => {
  const {
    type,
    author,
    source,
    site,
    datePublished
  } = props;

  return (
    <section className="modal_section modal_section--postMeta">
      <span className="modal_postmeta_content">
        Source: <a href={ source } target="_blank">{ site }</a>
      </span>
      { author && <span className="modal_postmeta_content"> Author: { author } </span> }
      { type === 'video' && <span className="modal_postmeta_content">Owner: IIP, Office of Video Production</span> }
      { type === 'article' && <span className="modal_postmeta_content">Owner: IIP, Office of Editorial Content</span> }
      <span className="modal_postmeta_content">
        Date Published: { moment( datePublished ).format( 'MMMM DD, YYYY' ) }
      </span>
    </section>
  );
};

ModalPostMeta.propTypes = {
  type: string,
  author: string,
  source: string,
  site: string,
  datePublished: string
};

export default ModalPostMeta;
