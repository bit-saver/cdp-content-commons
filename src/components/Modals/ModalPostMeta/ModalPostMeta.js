import React from 'react';
import moment from 'moment';
import { string } from 'prop-types';
import './ModalPostMeta.css';

const ModalPostMeta = ( props ) => {
  const {
    type,
    author,
    source,
    logo,
    site,
    datePublished
  } = props;

  return (
    <section className="modal_section modal_section--postMeta">
      { logo && <img src={ logo } alt={ site } className="modal_postmeta_logo" /> }
      { !logo &&
        <span className="modal_postmeta_content">
          Source: <a href={ source } target="_blank">{ site }</a>
        </span>
      }
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
  source: string,
  logo: string,
  site: string,
  datePublished: string
};

export default ModalPostMeta;
