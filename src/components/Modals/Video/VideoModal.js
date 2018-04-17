import React, { Component } from 'react';
import { object } from 'prop-types';
import { Embed, Checkbox } from 'semantic-ui-react';

import plusIcon from '../../../assets/images/plus.svg';

import ModalContent from '../ModalContent';
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
      selectedLanguage: this.getLanguage()
    };
    this.handleLanguageChange = this.handleLanguageChange.bind( this );
  }
  getVideoSource() {
    const { unit } = this.state;
    if ( unit ) {
      const selected = unit;
      if ( selected.source && selected.source[0] && selected.source[0].stream && selected.source[0].stream.url ) {
        return selected.source[0].stream.url;
      }
    } else {
      return '';
    }
  }

  getVideoTranscript() {
    const { unit } = this.state;
    if ( unit ) {
      const selected = unit;
      if ( selected.transcript && selected.transcript.text ) {
        return selected.transcript.text;
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

  handleLanguageChange( value ) {
    if ( value ) {
      for ( let i = 0; i < this.props.item.units.length; i += 1 ) {
        if ( this.props.item.units[i].language.display_name === value ) {
          this.setState( {
            unit: this.props.item.units[i],
            selectedLanguage: value
          } );
        }
      }
    }
  }

  renderVideoPlayer() {
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
    return (
      <ModalContent headline={ unit.title }>
        <div className="modal_options">
          <div className="modal_options_left">
            <ModalLangDropdown
              item={ this.props.item }
              selected={ this.state.selectedLanguage }
              handleLanguageChange={ this.handleLanguageChange }
            />
            <Checkbox className="modal_captions" toggle label="Video with captions" />
          </div>
          <div className="modal_options_share">
            <img src={ plusIcon } alt="" />
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
              show={ unit.type === 'video' }
              content={
                <PopupTabbed
                  title="Download this video."
                  panes={ [
                    {
                      title: 'Original',
                      component: (
                        <DownloadVideo
                          selectedLanguageUnit={ unit }
                          instructions={
                            `Download the original video file without captions in ${unit.language.display_name}.
                            This download option is best for uploading this video to web pages.`
                          }
                          burnedInCaptions="no"
                        />
                      )
                    },
                    {
                      title: this.renderCaptionTabTitle(),
                      component: (
                        <DownloadVideo
                          selectedLanguageUnit={ unit }
                          instructions={
                            `Download this video with open captions in ${unit.language.display_name}.
                            This download option is best for uploading this video to social media.`
                          }
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
      </ModalContent>
    );
  }
}

VideoModal.propTypes = {
  item: object
};

export default VideoModal;
