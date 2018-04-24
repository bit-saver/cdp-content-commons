import React, { Component } from 'react';
import { object } from 'prop-types';
import { getItemRequest } from '../../../utils/api';
import { normalizeItem } from '../../../utils/parser';

import ModalItem from '../../Modals/ModalItem';
import ModalLangDropdown from '../../Modals/ModalLangDropdown/ModalLangDropdown';
import ModalContentMeta from '../../Modals/ModalContentMeta/ModalContentMeta';
import ModalPostMeta from '../../Modals/ModalPostMeta/ModalPostMeta';
import ModalPostTags from '../../Modals/ModalPostTags/ModalPostTags';
import ModalText from '../../Modals/ModalText/ModalText';

class PostModal extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      item: this.props.item,
      selectedLanguage: this.getLanguage(),
      textDirection: false
    };

    this.handleLanguageChange = this.handleLanguageChange.bind( this );
  }

  onFetchResult = ( response, value ) => {
    if ( response && response.hits.total > 0 ) {
      const item = normalizeItem( response.hits.hits[0] );
      this.setState( {
        item,
        selectedLanguage: value,
        textDirection: item.language.text_direction
      } );
    }
  }

  getLanguage() {
    const { language } = this.props.item;
    if ( !language ) return 'English';
    return language.display_name;
  }

  handleLanguageChange( value ) {
    const { item } = this.state;
    const language = item.languages.find( lang => lang.language.display_name === value );
    if ( language && language.post_id ) {
      getItemRequest( item.site, language.post_id )
        .then( response => this.onFetchResult( response, value ) );
    }
  }

  render() {
    if ( this.state && this.state.item ) {
      const { item, textDirection } = this.state;
      return (
        <ModalItem headline={ item.title } textDirection={ textDirection ? 'rtl' : 'ltr' }>
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
    return <ModalItem headline="Content Unavailable" />;
  }
}

PostModal.propTypes = {
  item: object
};

export default PostModal;
