import React, { Component } from 'react';
import downloadIcon from '../../assets/icons/icon_download.svg';
import { object, string, bool } from 'prop-types';

// NOTE: Using the 'download' attribute to trigger downloads
// Need to research more robust options depending on browser supprt
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
      weight: `${( size.filesize / 1000 / 1000 ).toFixed( 1 )}MB`
    };
  };

  getFnExt = ( url ) => {
    const extRe = /([0-9a-z]+)$/i;
    const exts = url.match( extRe );
    return exts[0];
  };

  sortByFilesize = ( a, b ) => {
    if ( a.size && a.size.filesize && b.size && b.size.filesize ) {
      return +a.size.filesize > +b.size.filesize;
    }
    return true;
  };

  renderFormItem( video, index ) {
    const { title } = this.props.selectedLanguageUnit;
    const size = this.getSizeInfo( video.size );
    const fn = `${title.replace( /\s/g, '_' )}_${video.size.width}.${this.getFnExt( video.downloadUrl )}`;

    return (
      <div key={ `fs_${index}` } style={ { marginBottom: '1em' } }>
        <a href={ video.downloadUrl } download={ fn } title="Download video">
          <img src={ downloadIcon } width="16" height="16" alt="Download video" style={ { marginRight: '.8em' } } />
        </a>
        { `${title} (${size.label}, ${size.weight})` }
      </div>
    );
  }

  renderFormItems( unit, burnedInCaptions ) {
    // fetch all source videos with NO burned in captions and then sort by file size
    const videos = unit.source.filter( video => ( video.burnedInCaptions === 'true' ) === burnedInCaptions );
    const videosWithSizeProp = unit.source.filter( video => video.size && video.size.filesize );

    // only sort the videos if each video has a filesize prop for comparison
    if ( videosWithSizeProp.length === videos.length ) {
      // filesize coming in as string, convert to number for comparision
      videos.sort( this.sortByFilesize );
    }

    const videosArr = videos.map( ( v, i ) => v.downloadUrl && this.renderFormItem( v, i ) );
    return <div>{ videosArr.length ? videosArr : 'There are no videos available for download at this time' }</div>;
  }

  render() {
    const { selectedLanguageUnit, burnedInCaptions } = this.props;
    return (
      <div>
        <div className="form-group_instructions">{ this.props.instructions }</div>
        { this.props.selectedLanguageUnit && this.renderFormItems( selectedLanguageUnit, burnedInCaptions ) }
      </div>
    );
  }
}

DownloadVideo.propTypes = {
  selectedLanguageUnit: object,
  instructions: string,
  burnedInCaptions: bool
};

export default DownloadVideo;
