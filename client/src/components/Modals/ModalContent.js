import React from 'react';
import { object } from 'prop-types';
import Video from '../Types/Video/Video';
import Post from '../Types/Post/Post';

const ModalContent = ( props ) => {
  const { item } = props;

  if ( item && item.type === 'video' ) return <Video item={ item } />;
  if ( item && item.type === 'post' ) return <Post item={ item } />;
};

ModalContent.propTypes = {
  item: object
};

export default ModalContent;
