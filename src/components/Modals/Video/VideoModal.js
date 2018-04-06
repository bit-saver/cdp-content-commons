import React, { Component } from 'react';
import { object } from 'prop-types';
import { Embed } from 'semantic-ui-react';

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
      item: this.props.item.selectedLanguageUnit,
      selectedLanguage: this.getLanguage()
    };
    this.handleLanguageChange = this.handleLanguageChange.bind( this );
  }
  getVideoSource() {
    const { item } = this.state;
    if ( item ) {
      const selected = item;
      if ( selected.source && selected.source[0] && selected.source[0].stream && selected.source[0].stream.url ) {
        return selected.source[0].stream.url;
      }
    } else {
      return '';
    }
  }

  getVideoTranscript() {
    const { item } = this.state;
    if ( item ) {
      const selected = item;
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

  getAvailableLanguages() {
    return this.props.item.units.map( item => ( {
      key: item.language.language_code,
      value: item.language.display_name,
      text: item.language.display_name
    } ) );
  }

  handleLanguageChange( value ) {
    if ( value ) {
      for ( let i = 0; i < this.props.item.units.length; i += 1 ) {
        if ( this.props.item.units[i].language.display_name === value ) {
          this.setState( {
            item: this.props.item.units[i],
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
    const { item } = this.state;
    return (
      <ModalContent headline={ item.title }>
        <div className="modal_options">
          <ModalLangDropdown
            languages={ this.getAvailableLanguages() }
            selected={ this.state.selectedLanguage }
            handleLanguageChange={ this.handleLanguageChange }
          />
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
                  item={ item }
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
              show={ item.type === 'video' }
              content={
                <PopupTabbed
                  title="Download this video."
                  panes={ [
                    {
                      title: 'Original',
                      component: (
                        <DownloadVideo
                          selectedLanguageUnit={ item }
                          instructions={
                            `Download the original video file without captions in ${item.language.display_name}.
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
                          selectedLanguageUnit={ item }
                          instructions={
                            `Download this video with open captions in ${item.language.display_name}.
                            This download option is best for uploading this video to social media.`
                          }
                          burnedInCaptions="yes"
                        />
                      )
                    },
                    { title: 'More', component: <DownloadMore units={ item.units } /> },
                    { title: 'Help', component: <DownloadHelp /> }
                  ] }
                  config={ { width: '87px', offset: '110px' } } // TODO: remove hardcoding, make it dynamic
                />
              }
            />
          </div>
        </div>

        { this.renderVideoPlayer() }

        <ModalContentMeta type={ item.type } dateUpdated={ item.modified } transcript={ this.getVideoTranscript() } />
        <ModalDescription description={ item.description } />
        <ModalPostMeta
          author={ item.author }
          source={ item.sourcelink }
          site={ item.site }
          datePublished={ item.published }
        />
        <ModalPostTags tags={ item.categories } />
      </ModalContent>
    );
  }
}

VideoModal.propTypes = {
  item: object
};

export default VideoModal;
