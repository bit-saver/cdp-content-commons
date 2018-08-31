/**
 *
 * PageUpload
 *
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectPageUpload from './selectors';

import './PageUpload.css';

/* eslint-disable react/prefer-stateless-function */
class PageUpload extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Upload Content</title>
          <meta name="description" content="Upload content to the Content Commons" />
        </Helmet>
        <div>[ PAGE UPLOAD CONTENT ]</div>
      </div>
    );
  }
}

PageUpload.propTypes = {
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  pageupload: makeSelectPageUpload()
} );

export default connect( mapStateToProps, actions )( PageUpload );

