import React, { Component } from 'react';
import { object } from 'prop-types';
import { getItemRequest } from '../../../utils/api';
import { normalizeItem } from '../../../utils/parser';

import embedIcon from '../../../assets/icons/icon_embed.svg';
import shareIcon from '../../../assets/icons/icon_share.svg';

import ModalItem from '../../Modals/ModalItem';
import ModalLangDropdown from '../../Modals/ModalLangDropdown/ModalLangDropdown';
import ModalContentMeta from '../../Modals/ModalContentMeta/ModalContentMeta';
import ModalPostMeta from '../../Modals/ModalPostMeta/ModalPostMeta';
import ModalPostTags from '../../Modals/ModalPostTags/ModalPostTags';
import ModalText from '../../Modals/ModalText/ModalText';

import PopupTrigger from '../../Popup/PopupTrigger';
import PopupTabbed from '../../Popup/PopupTabbed';
import Popup from '../../Popup/Popup';

// import Share from '../../Share/Share';
import EmbedPost from './EmbedPost';
import EmbedHelp from './EmbedHelp';

class Post extends Component {
  constructor( props ) {
    super( props );
    const { item } = this.props;
    this.state = {
      item,
      selectedLanguage: this.getLanguage(),
      textDirection: item.language.text_direction
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
        <ModalItem headline={ item.title } textDirection={ textDirection }>
          <div className="modal_options">
            <div className="modal_options_left">
              <ModalLangDropdown
                item={ this.props.item }
                selected={ this.state.selectedLanguage }
                handleLanguageChange={ this.handleLanguageChange }
              />
            </div>
            <div className="trigger-container" style={ { display: 'none' } }>
              <PopupTrigger
                toolTip="Embed this article."
                icon={ { img: embedIcon, dim: 24 } }
                show
                content={
                  <PopupTabbed
                    title="Embed this article on your site"
                    panes={ [
                      {
                        title: 'Copy Embed Code',
                        component: (
                          <EmbedPost
                            instructions="Copy and paste the code below to embed article on your site"
                            embedItem={ item }
                          />
                        )
                      },
                      { title: 'Help', component: <EmbedHelp /> }
                    ] }
                  />
                }
              />
              <PopupTrigger
                toolTip="Share article"
                icon={ { img: shareIcon, dim: 20 } }
                show
                content={
                  <Popup title="Share this article.">
                    { /* <Share
                      link={ shareLink }
                      id={ id }
                      site={ site }
                      title={ unit.title }
                      language={ selectedLanguage.locale }
                    /> */ }
                  </Popup>
                }
              />
            </div>
          </div>
          <div className="modal_thumbnail">
            <img src={ item.thumbnail } alt="post thumbnail" />
          </div>
          <ModalContentMeta type={ item.type } dateUpdated={ item.modified } />
          <ModalText textContent={ item.content } />
          <ModalPostMeta
            type={ item.type }
            author={ item.author }
            sourcelink={ item.sourcelink }
            logo={ item.logo }
            source={ item.site }
            datePublished={ item.published }
            originalLink={ item.link }
          />
          <ModalPostTags tags={ item.categories } />
        </ModalItem>
      );
    }
    return <ModalItem headline="Content Unavailable" />;
  }
}

Post.propTypes = {
  item: object
};

export default Post;
