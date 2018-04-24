import React, { Component } from 'react';
import { object } from 'prop-types';

import ModalItem from '../ModalItem';
import ModalLangDropdown from '../ModalLangDropdown/ModalLangDropdown';
import ModalContentMeta from '../ModalContentMeta/ModalContentMeta';
import ModalPostMeta from '../ModalPostMeta/ModalPostMeta';
import ModalPostTags from '../ModalPostTags/ModalPostTags';
import ModalText from '../ModalText/ModalText';

import PopupTrigger from '../../Popup/PopupTrigger';
import PopupTabbed from '../../Popup/PopupTabbed';

import DownloadHelp from '../../Video/DownloadHelp';
import Shortcode from '../../Video/Shortcode';
import Social from '../../Video/Social';
import ShareMore from '../../Video/ShareMore';

class ArticleModal extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      item: this.props.item,
      selectedLanguage: this.getLanguage()
    };

    this.handleLanguageChange = this.handleLanguageChange.bind( this );
  }

  getLanguage() {
    const { language } = this.props.item;
    if ( !language ) return 'English';
    return language.display_name;
  }

  handleLanguageChange( value ) {
    if ( value ) {
      const item = this.props.item.languages.find( lang => lang.display_name === value );
      // TODO: Need to create an api call to grab an individual post via site + id (for translations)
      if ( item ) {
        this.setState( {
          selectedLanguage: value
        } );
      }
    }
  }

  render() {
    const { item } = this.state;
    return (
      <ModalItem headline={ item.title }>
        <div className="modal_options">
          <div className="modal_options_left">
            <ModalLangDropdown
              item={ this.props.item }
              selected={ this.state.selectedLanguage }
              handleLanguageChange={ this.handleLanguageChange }
            />
          </div>
          <div className="modal_options_share">
            <a href={ item.link } target="_blank">View Original</a>
            <PopupTrigger
              toolTip="Copy the shortcode for this article or<br> share it social platforms."
              icon="share"
              // show={ item.type === 'post' }
              show={ false }
              content={
                <PopupTabbed
                  title="How would you like to share this article?"
                  item={ item }
                  panes={ [
                    { title: 'Copy Shortcode', component: <Shortcode /> },
                    { title: 'Social', component: <Social /> },
                    { title: 'More', component: <ShareMore /> },
                    { title: 'Help', component: <DownloadHelp /> }
                  ] }
                  config={ { width: '141px', offset: '115px' } }
                />
              }
            />
          </div>
        </div>
        <div className="modal_thumbnail">
          <img src={ item.thumbnail } alt="article thumbnail" />
        </div>
        <ModalContentMeta type={ item.type } dateUpdated={ item.modified } />
        <ModalText textContent={ ( item.content ) ? item.content : item.description } />
        <ModalPostMeta
          type={ item.type }
          author={ item.author }
          source={ item.sourcelink }
          site={ item.site }
          datePublished={ item.published }
        />
        <ModalPostTags tags={ item.categories } />
      </ModalItem>
    );
  }
}

ArticleModal.propTypes = {
  item: object
};

export default ArticleModal;
