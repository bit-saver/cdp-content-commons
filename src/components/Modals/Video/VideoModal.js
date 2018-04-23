import React, { Component } from 'react';
import { object } from 'prop-types';
import { Embed, Checkbox } from 'semantic-ui-react';

import ModalItem from '../ModalItem';
import ModalLangDropdown from '../ModalLangDropdown/ModalLangDropdown';
import ModalContentMeta from '../ModalContentMeta/ModalContentMeta';
import ModalDescription from '../ModalDescription/ModalDescription';
import ModalPostMeta from '../ModalPostMeta/ModalPostMeta';
import ModalPostTags from '../ModalPostTags/ModalPostTags';

import PopupTrigger from '../../Popup/PopupTrigger';
import PopupTabbed from '../../Popup/PopupTabbed';

import DownloadVideo from '../../Video/DownloadVideo';
import DownloadMore from '../../Video/DownloadMore';
import DownloadHelp from '../../Video/DownloadHelp';
import Shortcode from '../../Video/Shortcode';
import Social from '../../Video/Social';
import ShareMore from '../../Video/ShareMore';

class VideoModal extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      unit: this.props.item.selectedLanguageUnit,
      selectedLanguage: this.getLanguage(),
      captions: this.getCaptions()
    };

    this.handleLanguageChange = this.handleLanguageChange.bind( this );
    this.handleCaptionChange = this.handleCaptionChange.bind( this );
  }

  getVideoSource() {
    const { unit, captions } = this.state;
    if ( unit && Array.isArray( unit.source ) ) {
      const source = unit.source.find( caption => ( caption.burnedInCaptions === 'true' ) === captions );
      if ( source && source.stream && source.stream.url ) {
        return source.stream.url;
      }
    }
    return null;
  }

  // NOTE: Chrome is throwing an error when youtube is embedded:
  // https://stackoverflow.com/questions/48714879/error-parsing-header-x-xss-protection-google-chrome
  getYouTubeId() {
    const { unit, captions } = this.state;
    if ( unit && Array.isArray( unit.source ) ) {
      const source = unit.source.find( caption => ( caption.burnedInCaptions === 'true' ) === captions );

      if ( source && source.streamUrl ) {
        const streamObj = source.streamUrl.find( stream => stream.site === 'youtube' );

        if ( streamObj && streamObj.url ) {
          const youtubeUrl = streamObj.url;

          const re = /https:\/\/youtu.be\/(.*)/;
          const id = youtubeUrl.match( re );
          return id[1] || null;
        }
      }
    }
    return null;
  }

  getVideoTranscript() {
    const { unit } = this.state;
    if ( unit ) {
      if ( unit.transcript && unit.transcript.text ) {
        return unit.transcript.text;
      }
    } else {
      return '';
    }
  }

  getLanguage() {
    const { selectedLanguageUnit } = this.props.item;
    if ( !selectedLanguageUnit ) return 'English';
    return selectedLanguageUnit.language.display_name;
  }

  // Note: The burnedInCaptions porperty is coming in as 'true' and 'false' strings.  Need to be careful
  // need to coerce is spots to ensure valid comparison.  Going forweard, try to avoid 'true' and 'false' strings
  getCaptions() {
    const { selectedLanguageUnit } = this.props.item;
    if ( !selectedLanguageUnit ) return false;
    const { source } = selectedLanguageUnit;
    if ( !source ) return false;
    if ( !source[0] ) return false;

    return source[0].burnedInCaptions === 'true'; // coerce to a boolean
  }

  handleLanguageChange( value ) {
    if ( value ) {
      const unit = this.props.item.units.find( lang => lang.language.display_name === value );
      if ( unit ) {
        this.setState( {
          unit,
          selectedLanguage: value,
          captions: unit.source[0] ? unit.source[0].burnedInCaptions === 'true' : false
        } );
      }
    }
  }

  handleCaptionChange() {
    this.setState( { captions: !this.state.captions } );
  }

  renderVideoPlayer() {
    // console.log( `rendering video with captions ${this.state.captions}` );
    // render youtube player if link available
    const youTubeId = this.getYouTubeId();
    if ( youTubeId ) {
      return <Embed id={ youTubeId } placeholder={ this.props.item.thumbnail } source="youtube" />;
    }
    // console.log( 'loading cloudflare' );
    // fallback to CloudFlare player if no youtube link available
    const url = this.getVideoSource();
    const active = !!url;
    const icon = active ? 'video play' : 'warning circle';

    return <Embed active={ active } icon={ icon } placeholder={ this.props.item.thumbnail } url={ url } />;
  }

  renderCaptionTabTitle() {
    const { selectedLanguageUnit } = this.props.item;
    if ( !selectedLanguageUnit ) {
      return 'With Subtitles';
    }
    const source = selectedLanguageUnit.source.find( src => src.burnedInCaptions === 'no' );
    return source ? 'With Captions' : 'With Subtitles';
  }

  render() {
    const { unit } = this.state;
    if ( unit ) {
      return (
        <ModalItem headline={ unit.title } >
          <div className="modal_options">
            <div className="modal_options_left">
              <ModalLangDropdown
                item={ this.props.item }
                selected={ this.state.selectedLanguage }
                handleLanguageChange={ this.handleLanguageChange }
              />
              { unit.source.length > 1 && (
                <Checkbox
                  className="modal_captions"
                  checked={ this.state.captions }
                  toggle
                  label="Video with captions"
                  onChange={ this.handleCaptionChange }
                />
              ) }
            </div>
            <div className="modal_options_share">
              <PopupTrigger
                toolTip=""
                icon="plus circle"
                // show={ item.type === 'video' }
                show={ false }
                content={ <div /> }
              />
              <PopupTrigger
                toolTip="Copy the shortcode for this video or<br> share it social platforms."
                icon="share"
                // show={ item.type === 'video' }
                show={ false }
                content={
                  <PopupTabbed
                    title="How would you like to share this video?"
                    item={ unit }
                    panes={ [
                      { title: 'Copy Shortcode', component: <Shortcode /> },
                      { title: 'Social', component: <Social /> },
                      { title: 'More', component: <ShareMore /> },
                      { title: 'Help', component: <DownloadHelp /> }
                    ] }
                    config={ { width: '141px', offset: '115px' } } // TODO: remove hardcoding, make it dynamic
                  />
                }
              />
              <PopupTrigger
                toolTip="Download this video with an embed code"
                icon="download"
                position="right"
                show={ this.props.item.type === 'video' }
                content={
                  <PopupTabbed
                    title="Download this video."
                    panes={ [
                      {
                        title: 'Original',
                        component: (
                          <DownloadVideo
                            selectedLanguageUnit={ unit }
                            instructions={ `Download the original video file without captions in ${
                              unit.language.display_name
                            }.
                              This download option is best for uploading this video to web pages.` }
                            burnedInCaptions="no"
                          />
                        )
                      },
                      {
                        title: this.renderCaptionTabTitle(),
                        component: (
                          <DownloadVideo
                            selectedLanguageUnit={ unit }
                            instructions={ `Download this video with open captions in ${unit.language.display_name}.
                              This download option is best for uploading this video to social media.` }
                            burnedInCaptions="yes"
                          />
                        )
                      },
                      { title: 'More', component: <DownloadMore units={ this.props.item.units } /> },
                      { title: 'Help', component: <DownloadHelp /> }
                    ] }
                    config={ { width: '87px', offset: '110px' } } // TODO: remove hardcoding, make it dynamic
                  />
                }
              />
            </div>
          </div>

          { this.renderVideoPlayer() }

          <ModalContentMeta type={ unit.type } dateUpdated={ unit.modified } transcript={ this.getVideoTranscript() } />
          <ModalDescription description={ unit.desc } />
          <ModalPostMeta
            author={ unit.author }
            source={ unit.sourcelink }
            site={ unit.site }
            datePublished={ unit.published }
          />
          <ModalPostTags tags={ unit.categories } />
        </ModalItem>
      );
    }
    return <ModalItem headline="Content Unavailable" />;
  }
}

VideoModal.propTypes = {
  item: object
};

export default VideoModal;
