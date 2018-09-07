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
import audioIcon from 'assets/icons/icon_150px_audio_blue.png';
import videoIcon from 'assets/icons/icon_150px_video_blue.png';
import imageIcon from 'assets/icons/icon_150px_images_blue.png';
import docIcon from 'assets/icons/icon_150px_document_blue.png';
import eduIcon from 'assets/icons/icon_150px_edu_blue.png';
import * as actions from './actions';
import makeSelectPageUpload from './selectors';
import { Button } from 'semantic-ui-react';

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
        <div className="upload-content">
          <h2>Upload content</h2>
          <div className="contentTypes">
            <Button icon className="type disabled">
              <img src={ audioIcon } alt="" />
              <div className="type--label">
                Audio
              </div>
            </Button>
            <Button icon className="type">
              <img src={ videoIcon } alt="" />
              <div className="type--label">
                Videos
              </div>
            </Button>
            <Button icon className="type disabled">
              <img src={ imageIcon } alt="" />
              <div className="type--label">
                Images
              </div>
            </Button>
            <Button icon className="type disabled">
              <img src={ docIcon } alt="" />
              <div className="type--label">
                Documents
              </div>
            </Button>
            <Button icon className="type disabled">
              <img src={ eduIcon } alt="" />
              <div className="type--label">
                Teaching Materials
              </div>
            </Button>
          </div>
        </div>
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
