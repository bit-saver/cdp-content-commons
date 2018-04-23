import React from 'react';
import { object } from 'prop-types';
import VideoModal from './Video/VideoModal';
import ArticleModal from './Article/ArticleModal';
import './ModalContent.css';

const ModalContent = ( props ) => {
  const { item } = props;

  if ( item && item.type === 'video' ) return <VideoModal item={ item } />;
  if ( item && item.type === 'post' ) return <ArticleModal item={ item } />;
};

ModalContent.propTypes = {
  item: object
};

export default ModalContent;
