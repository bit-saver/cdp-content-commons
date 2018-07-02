import React, { Component } from 'react';
import { object } from 'prop-types';
import { Embed, Checkbox } from 'semantic-ui-react';

import { updateUrl } from '../../../utils/browser';

// import plusIcon from '../../../assets/icons/icon_plus.svg';
import downloadIcon from '../../../assets/icons/icon_download.svg';
import shareIcon from '../../../assets/icons/icon_share.svg';

import ModalItem from '../../Modals/ModalItem';
import ModalLangDropdown from '../../Modals/ModalLangDropdown/ModalLangDropdown';
import ModalContentMeta from '../../Modals/ModalContentMeta/ModalContentMeta';
import ModalDescription from '../../Modals/ModalDescription/ModalDescription';
import ModalPostMeta from '../../Modals/ModalPostMeta/ModalPostMeta';
import ModalPostTags from '../../Modals/ModalPostTags/ModalPostTags';

import PopupTrigger from '../../Popup/PopupTrigger';
import PopupTabbed from '../../Popup/PopupTabbed';
import Popup from '../../Popup/Popup';

import DownloadVideo from './DownloadVideo';
import DownloadSrt from './DownloadSrt';
import DownloadTranscript from './DownloadTranscript';
import DownloadHelp from './DownloadHelp';
import Share from '../../Share/Share';

import './Video.css';

class Video extends Component {
  constructor( props ) {
    super( props );

    const { item } = this.props;
    this.state = {
      unit: item.selectedLanguageUnit,
      selectedLanguage: this.getLanguage( item.selectedLanguageUnit )
    };
  }

  componentDidMount() {
    this.willUpdateUrl();
  }

  shouldComponentUpdate( nextProps, nextState ) {
    const { selectedLanguageUnit } = nextProps.item;
    if ( selectedLanguageUnit.language.locale !== nextState.selectedLanguage.locale ) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    this.willUpdateUrl();
  }

  componentWillUnmount() {
    updateUrl( '/' );
  }

  getSelectedUnit() {
    return this.state.language
      ? this.props.item.units.find( lang => lang.language.display_name === this.state.language )
      : this.props.item.selectedLanguageUnit;
  }

  getShareLink( unit, captions ) {
    const youtube = this.getYouTube( unit, captions, 'link' );
    if ( youtube ) {
      return youtube;
    }

    return this.getVideoSource( 'link' );
  }

  getVideoSource = ( unit, captions, type = 'id' ) => {
    if ( unit && Array.isArray( unit.source ) ) {
      const source = unit.source.find( caption => ( caption.burnedInCaptions === 'true' ) === captions );
      if ( source && source.stream && source.stream.url ) {
        return type === 'link' ? source.stream.url : source.stream.uid;
      }
    }
    return null;
  };

  // NOTE: Chrome is throwing an error when youtube is embedded:
  // https://stackoverflow.com/questions/48714879/error-parsing-header-x-xss-protection-google-chrome
  getYouTube = ( unit, captions, type = 'id' ) => {
    let id = null;

    if ( unit && Array.isArray( unit.source ) ) {
      const source = unit.source.find( caption => ( caption.burnedInCaptions === 'true' ) === captions );

      if ( source && source.streamUrl ) {
        const streamObj = source.streamUrl.find( stream => stream.site === 'youtube' );

        if ( streamObj && streamObj.site === 'youtube' && streamObj.url ) {
          if ( type === 'link' ) {
            return streamObj.url;
          }

          const youtubeUrl = streamObj.url;

          const reShort = /https:\/\/youtu.be\/(.*)/;
          const reLong = /https:\/\/www.youtube.com\/watch\?v=(.*)/;

          id = youtubeUrl.match( reShort );
          if ( id && id[1] ) {
            return id[1];
          }

          id = youtubeUrl.match( reLong );
          if ( id && id[1] ) {
            return id[1];
          }
        }
      }
    }

    return id;
  };

  getVimeo = ( unit, captions, type = 'id' ) => {
    if ( unit && Array.isArray( unit.source ) ) {
      const source = unit.source.find( caption => ( caption.burnedInCaptions === 'true' ) === captions );
      if ( source && source.stream && source.stream.site === 'vimeo' && source.stream.url ) {
        return type === 'link' ? source.stream.url : source.stream.uid;
      }
    }
    return null;
  };

  getVideoTranscript = ( unit ) => {
    if ( unit ) {
      if ( unit.transcript && unit.transcript.text ) {
        return unit.transcript.text;
      }
    } else {
      return '';
    }
  };

  getLanguage = ( unit ) => {
    if ( unit && unit.language ) {
      return unit.language;
    }
    return { display_name: 'English', locale: 'en-us', text_direction: 'ltr' };
  };

  // Note: The burnedInCaptions porperty is coming in as 'true' and 'false' strings. Need to coerce
  //  in spots to ensure valid comparison.  Going forweard, try to avoid 'true' and 'false' strings
  getCaptions = ( unit ) => {
    if ( unit && unit.source && unit.source[0] ) {
      return unit.source[0].burnedInCaptions === 'true'; // coerce to a boolean
    }
    return false;
  };

  willUpdateUrl() {
    const { id, site } = this.props.item;
    const { selectedLanguage } = this.state;
    if ( id && site && selectedLanguage ) {
      updateUrl( `/video?id=${id}&site=${site}&language=${selectedLanguage.locale}` );
    }
  }

  handleLanguageChange = ( value ) => {
    if ( value ) {
      const unit = this.props.item.units.find( lang => lang.language.display_name === value );
      if ( unit ) {
        this.setState( {
          unit,
          selectedLanguage: this.getLanguage( unit )
        } );
      }
    }
  };

  handleCaptionChange = () => {
    this.setState( { captions: !this.state.captions } );
  };

  renderVideoPlayer( unit, captions ) {
    // render youtube player if link available
    const youTubeId = this.getYouTube( unit, captions );
    if ( youTubeId ) {
      return <Embed id={ youTubeId } placeholder={ this.props.item.thumbnail } source="youtube" />;
    }

    // fallback to Vimeo if no youtube link available
    const vimeoId = this.getVimeo( unit, captions );
    if ( vimeoId ) {
      return <Embed id={ vimeoId } placeholder={ this.props.item.thumbnail } source="vimeo" />;
    }

    // fallback to CloudFlare player if no youtube or vimeo link available
    const uid = this.getVideoSource( unit, captions );
    const active = !!uid;
    const icon = active ? 'video play' : 'warning circle';

    return (
      <Embed
        active={ active }
        icon={ icon }
        placeholder={ this.props.item.thumbnail }
        url={ `https://iframe.cloudflarestream.com/${uid}` }
      />
    );
  }

  render() {
    const { unit, selectedLanguage } = this.state;
    const {
      type, logo, author, owner, published, modified, id, site
    } = this.props.item;

    if ( unit && selectedLanguage ) {
      const captions = this.getCaptions( unit );

      return (
        <ModalItem headline={ unit.title } textDirection={ selectedLanguage.text_direction }>
          <div className="modal_options">
            <div className="modal_options_left">
              <ModalLangDropdown
                item={ this.props.item }
                selected={ selectedLanguage.display_name }
                handleLanguageChange={ this.handleLanguageChange }
              />
              { unit.source.length > 1 && (
                <Checkbox
                  className="modal_captions"
                  checked={ captions }
                  toggle
                  label="Video with captions"
                  onChange={ this.handleCaptionChange }
                />
              ) }
            </div>
            <div className="modal_options_share">
              <PopupTrigger
                toolTip=""
                icon={ { img: shareIcon, dim: 20 } }
                // show={ item.type === 'video' }
                show={ false }
                content={ <div /> }
              />
              <PopupTrigger
                toolTip="Share video"
                icon={ { img: shareIcon, dim: 20 } }
                show={ type === 'video' }
                content={
                  <Popup title="Share this video.">
                    <Share
                      link={ this.getShareLink( unit, captions ) }
                      id={ id }
                      site={ site }
                      title={ unit.title }
                      language={ selectedLanguage.locale }
                    />
                  </Popup>
                }
              />
              <PopupTrigger
                toolTip="Download video"
                icon={ { img: downloadIcon, dim: 18 } }
                position="right"
                show={ type === 'video' }
                content={
                  <PopupTabbed
                    title="Download this video."
                    panes={ [
                      {
                        title: 'Video File',
                        component: (
                          <DownloadVideo
                            selectedLanguageUnit={ unit }
                            instructions={ `Download the video and SRT files in ${unit.language.display_name}.
                              This download option is best for uploading this video to web pages.` }
                            burnedInCaptions={ captions }
                          />
                        )
                      },
                      {
                        title: 'SRT',
                        component: (
                          <DownloadSrt
                            selectedLanguageUnit={ unit }
                            instructions="Download SRTs"
                            units={ this.props.item.units }
                          />
                        )
                      },
                      {
                        title: 'Transcript',
                        component: (
                          <DownloadTranscript units={ this.props.item.units } instructions="Download Transcripts" />
                        )
                      },
                      { title: 'Help', component: <DownloadHelp /> }
                    ] }
                  />
                }
              />
            </div>
          </div>

          { this.renderVideoPlayer( unit, captions ) }

          <ModalContentMeta type={ type } dateUpdated={ modified } transcript={ this.getVideoTranscript() } />
          <ModalDescription description={ unit.desc } />
          <ModalPostMeta author={ author } logo={ logo } source={ owner } datePublished={ published } />
          <ModalPostTags tags={ unit.categories } />
        </ModalItem>
      );
    }
    // }
    return <ModalItem headline="Content Unavailable" />;
  }
}

Video.propTypes = {
  item: object
};

export default Video;
