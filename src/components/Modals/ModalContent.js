import React from 'react';
import { object } from 'prop-types';
import VideoModal from '../Types/Video/VideoModal';
import PostModal from '../Types/Post/PostModal';
import './ModalContent.css';

const ModalContent = ( props ) => {
  const { item } = props;

  if ( item && item.type === 'video' ) return <VideoModal item={ item } />;
  if ( item && item.type === 'post' ) return <PostModal item={ item } />;
};

ModalContent.propTypes = {
  item: object
};

export default ModalContent;
