import React, { Component } from 'react';
import { object } from 'prop-types';

import ModalItem from '../../Modals/ModalItem';
import ModalLangDropdown from '../../Modals/ModalLangDropdown/ModalLangDropdown';
import ModalContentMeta from '../../Modals/ModalContentMeta/ModalContentMeta';
import ModalPostMeta from '../../Modals/ModalPostMeta/ModalPostMeta';
import ModalPostTags from '../../Modals/ModalPostTags/ModalPostTags';
import ModalText from '../../Modals/ModalText/ModalText';

import PopupTrigger from '../../Popup/PopupTrigger';
import PopupTabbed from '../../Popup/PopupTabbed';

class PostModal extends Component {
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
          </div>
        </div>
        <div className="modal_thumbnail">
          <img src={ item.thumbnail } alt="post thumbnail" />
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

PostModal.propTypes = {
  item: object
};

export default PostModal;
