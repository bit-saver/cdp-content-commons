import React from 'react';
import { object } from 'prop-types';
import { Image } from 'semantic-ui-react';

import plusIcon from '../../../assets/images/plus.svg';

import ModalContent from '../ModalContent';
import ModalLangDropdown from '../ModalLangDropdown/ModalLangDropdown';
import ModalContentMeta from '../ModalContentMeta/ModalContentMeta';
import ModalDescription from '../ModalDescription/ModalDescription';
import ModalPostMeta from '../ModalPostMeta/ModalPostMeta';
import ModalPostTags from '../ModalPostTags/ModalPostTags';

import PopupTrigger from '../../Popup/PopupTrigger';
import PopupTabbed from '../../Popup/PopupTabbed';

import ClosedCaptions from '../../Video/ClosedCaptions';
import OpenCaptions from '../../Video/OpenCaptions';
import DownloadMore from '../../Video/DownloadMore';
import DownloadHelp from '../../Video/DownloadHelp';
import Shortcode from '../../Video/Shortcode';
import Social from '../../Video/Social';


const VideoModal = ( props ) => {
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
            content={
              <PopupTabbed
                title="How would you like to share this video?"
                panes={ [
                  { title: 'Copy Shortcode', component: <Shortcode /> },
                  { title: 'Social', component: <Social /> },
                  { title: 'More', component: <DownloadMore /> },
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
            content={
              <PopupTabbed
                title="Download this video."
                panes={ [
                  { title: 'Closed Captions', component: <ClosedCaptions /> },
                  { title: 'Open Captions', component: <OpenCaptions /> },
                  { title: 'More', component: <DownloadMore /> },
                  { title: 'Help', component: <DownloadHelp /> }
                ] }
                config={ { width: '142px', offset: '84px' } } // TODO: remove hardcoding, make it dynamic
              />
            }
          />
        </div>
      </div>

      <Image src={ item.thumbnail } fluid />

      <ModalContentMeta dateUpdated={ item.modified } />
      <ModalDescription description={ item.description } />
      <ModalPostMeta source={ item.sourcelink } site={ item.site } datePublished={ item.published } />
      <ModalPostTags tags={ item.categories } />
    </ModalContent>
  );
};

VideoModal.propTypes = {
  item: object
};

export default VideoModal;
