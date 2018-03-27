import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import FileDownload from '../FileDownload';
import { object, string } from 'prop-types';
import * as zip from '../../utils/zip';

class DownloadVideo extends Component {
  getSrt() {
    const arr = [];
    const unit = this.props.selectedLanguageUnit;
    if ( unit && unit.srt && unit.srt.srcUrl ) {
      arr.push( unit.srt.srcUrl );
    }

    return arr;
  }

  getSizeInfo = ( size ) => {
    if ( !size ) return null;
    return {
      label: `${size.width} x ${size.height}`,
      weight: `(${( size.filesize / 1000 / 1000 ).toFixed( 1 )}MB`
    };
  };

  handleDownloadClick = ( url, cb ) => {
    const srt = this.getSrt();
    zip.create( [url, ...srt], 'video_archive', cb );
  };

  sortByFilesize = ( a, b ) => {
    if ( a.size && a.size.filesize && b.size && b.size.filesize ) {
      return +a.size.filesize > +b.size.filesize;
    }
    return true;
  };

  renderFormItem( video, index ) {
    const size = this.getSizeInfo( video.size );
    const label = size && (
      <div>
        { size.label } <span>{ size.weight })</span>
      </div>
    );
    return (
      <FileDownload
        key={ `v-${index}` }
        label={ label }
        value={ video.downloadUrl }
        url={ video.downloadUrl }
        onClick={ this.handleDownloadClick }
      />
    );
  }

  renderFormItems( unit ) {
    // fetch all source videos with NO burned in captions and then sort by file size
    const videos = unit.source.filter( video => video.burnedInCaptions === this.props.burnedInCaptions );

    const videosWithSizeProp = unit.source.filter( video => video.size && video.size.filesize );
    // only sort the videos if each video has a filesize prop for comparison
    if ( videosWithSizeProp.length === videos.length ) {
      // filesize coming in as string, convert to number for comparision
      videos.sort( this.sortByFilesize );
    }

    return <div>{ videos.map( ( v, i ) => v.downloadUrl && this.renderFormItem( v, i ) ) }</div>;
  }

  render() {
    return (
      <div>
        <span className="form-group_instructions">{ this.props.instructions }</span>
        <Form className="form-group_tabbed">
          { this.props.selectedLanguageUnit && this.renderFormItems( this.props.selectedLanguageUnit ) }
        </Form>
      </div>
    );
  }
}

DownloadVideo.propTypes = {
  selectedLanguageUnit: object,
  instructions: string,
  burnedInCaptions: string
};

export default DownloadVideo;
