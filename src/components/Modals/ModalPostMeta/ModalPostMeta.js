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
    datePublished,
    textDirection
  } = props;

  return (
    <section className="modal_section modal_section--postMeta">
      { textDirection === 'ltr' &&
        <span className="modal_postmeta_content">Source: <a href={ source } target="_blank">{ site }</a></span>
      }
      { textDirection === 'rtl' &&
        <span className="modal_postmeta_content"><a href={ source } target="_blank">{ site }</a> :Source</span>
      }
      { author &&
        <span className="modal_postmeta_content">
          { textDirection === 'ltr' && `Author: ${author}` }
          { textDirection === 'rtl' && `${author} :Author` }
        </span>
      }
      { type === 'video' && <span className="modal_postmeta_content">Owner: IIP, Office of Video Production</span> }
      { type === 'article' && <span className="modal_postmeta_content">Owner: IIP, Office of Editorial Content</span> }
      <span className="modal_postmeta_content">
        { textDirection === 'ltr' && `Date Published: ${moment( datePublished ).format( 'MMMM DD, YYYY' )}` }
        { textDirection === 'rtl' && `${moment( datePublished ).format( 'MMMM DD, YYYY' )} :Date Published` }
      </span>
    </section>
  );
};

ModalPostMeta.propTypes = {
  type: string,
  author: string,
  source: string,
  site: string,
  datePublished: string,
  textDirection: string
};

export default ModalPostMeta;
