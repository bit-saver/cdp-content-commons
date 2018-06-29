import React from 'react';
import { object } from 'prop-types';
import Video from '../Types/Video/Video';
import PostModal from '../Types/Post/PostModal';

const ModalContent = ( props ) => {
  const { item } = props;

  if ( item && item.type === 'video' ) return <Video item={ item } />;
  if ( item && item.type === 'post' ) return <PostModal item={ item } />;
};

ModalContent.propTypes = {
  item: object
};

export default ModalContent;
