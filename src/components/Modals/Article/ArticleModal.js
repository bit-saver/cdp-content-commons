import React from 'react';
import { obj } from 'prop-types';

import plusIcon from '../../../assets/images/plus.svg';

import ModalContent from '../ModalContent';
import ModalLangDropdown from '../ModalLangDropdown/ModalLangDropdown';
import ModalContentMeta from '../ModalContentMeta/ModalContentMeta';
import ModalPostMeta from '../ModalPostMeta/ModalPostMeta';
import ModalPostTags from '../ModalPostTags/ModalPostTags';
import ModalText from '../ModalText/ModalText';
import tempTextContent from '../ModalText/tempContent';

import PopupTrigger from '../../Popup/PopupTrigger';
import PopupTabbed from '../../Popup/PopupTabbed';

import DownloadHelp from '../../Video/DownloadHelp';
import Shortcode from '../../Video/Shortcode';
import Social from '../../Video/Social';
import ShareMore from '../../Video/ShareMore';

const ArticleModal = ( props ) => {
  const tempLanguages = [
    { key: 'English', value: 'English', text: 'English' },
    { key: 'Arabic', value: 'Arabic', text: 'Arabic' },
    { key: 'French', value: 'French', text: 'French' },
    { key: 'Russian', value: 'Russian', text: 'Russian' },
    { key: 'Spanish', value: 'Spanish', text: 'Spanish' }
  ];

  const { item } = props;

  return (
    <ModalContent headline={ item.title }>
      <div className="modal_options">
        <ModalLangDropdown languages={ tempLanguages } />
        <div className="modal_options_share">
          <img src={ plusIcon } alt="" />
          <PopupTrigger
            toolTip="Copy the shortcode for this video or<br> share it social platforms."
            icon="share"
            show={ item.type === 'article' }
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
      <ModalText textContent={ tempTextContent } />
      <ModalPostMeta
        type={ item.type }
        author={ item.author }
        source={ item.sourcelink }
        site={ item.site }
        datePublished={ item.published }
      />
      <ModalPostTags tags={ item.categories } />
    </ModalContent>
  );
};

ArticleModal.propTypes = {
  item: obj
};

export default ArticleModal;
