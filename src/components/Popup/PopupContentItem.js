import React from 'react';
import { node, string, object } from 'prop-types';
import './PopupElem.css';

const PopupContentItem = ( props ) => {
  const { domProps, headline } = props;

  return (
    <div { ...domProps }>
      <p className="popupElem_content_info">{ headline }</p>
      { props.children }
    </div>
  );
};

PopupContentItem.propTypes = {
  children: node,
  domProps: object,
  headline: string
};

export default PopupContentItem;
