import React from 'react';
import { Form } from 'semantic-ui-react';
import FileDownload from '../FileDownload';
import * as zip from '../../utils/zip';
import { array } from 'prop-types';

const DownloadMore = ( props ) => {
  const assets = {
    srt: {
      languages: [],
      urls: []
    },
    transcript: {
      languages: [],
      urls: []
    }
  };

  const handleSrtDownloadClick = ( url, cb ) => {
    zip.create( assets.srt.urls, 'srt_archive', cb );
  };

  const handleTranscriptDownloadClick = ( url, cb ) => {
    zip.create( assets.transcript.urls, 'transcript_archive', cb );
  };

  const getInputValue = ( type ) => {
    const { languages } = assets[type];
    const len = languages.length;
    return `${len} ${type}${len > 1 ? 's' : ''} available in ${languages.join( ', ' )}`;
  };

  const getLanguages = () => {
    props.units.forEach( ( unit ) => {
      if ( unit.srt && unit.srt.srcUrl ) {
        assets.srt.urls.push( unit.srt.srcUrl );
        assets.srt.languages.push( unit.language.display_name );
      }
      if ( unit.transcript && unit.transcript.srcUrl ) {
        assets.transcript.urls.push( unit.transcript.srcUrl );
        assets.transcript.languages.push( unit.language.display_name );
      }
    } );

    const languages = [...assets.srt.languages, ...assets.transcript.languages];
    const uniq = [...new Set( languages )];

    return uniq.join( ', ' );
  };

  const languages = getLanguages();

  return (
    <div>
      <span className="form-group_instructions">
        { `Download additional assets including SRT files and transcripts in ${languages} for this video. Download
        will include assets in all available languages.` }
      </span>
      <Form className="form-group_tabbed">
        { !!assets.srt.urls.length && (
          <FileDownload onClick={ handleSrtDownloadClick } label="SRTs" value={ getInputValue( 'srt' ) } />
        ) }
        { !!assets.transcript.urls.length && (
          <FileDownload
            onClick={ handleTranscriptDownloadClick }
            label="Transcripts"
            value={ getInputValue( 'transcript' ) }
          />
        ) }
      </Form>
    </div>
  );
};

DownloadMore.propTypes = {
  units: array
};

export default DownloadMore;
