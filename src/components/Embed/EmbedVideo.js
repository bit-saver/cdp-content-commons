import React from 'react';
import { string } from 'prop-types';
import { Input } from 'semantic-ui-react';

const EmbedVideo = ( props ) => {
  const { embedcode } = props;

  return (
    <div className="videoEmbed_wrapper">
      <div className="videoEmbed">
        <div className="videoEmbed_label_wrapper">
          <p className="videoEmbed_label">{ props.label }</p>
        </div>
        <div className="videoEmbed_code">
          <Input value={ embedcode } disabled />
          <a href={ props.downloadUrl } className="ui button primary" download>
            Download
          </a>
        </div>
      </div>
      <span className="videoEmbed_specs">{ props.specs }</span>
    </div>
  );
};

EmbedVideo.propTypes = {
  embedcode: string,
  downloadUrl: string,
  specs: string,
  label: string
};

export default EmbedVideo;
