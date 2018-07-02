import React from 'react';
import { string, number } from 'prop-types';
import { List } from 'semantic-ui-react';
import ClipboardCopy from '../ClipboardCopy/ClipboardCopy';
import { stringifyQueryString } from '../../utils/browser';

import './Share.css';

const Share = ( props ) => {
  const {
    id, site, language, title, link
  } = props;

  const queryStr = stringifyQueryString( { id, site, language } );
  const directLink = `${window.location.protocol}//${window.location.host}/video?${queryStr}`;
  const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
  const tweet = `https://twitter.com/home?status=${title} ${link}`;

  return (
    <div>
      { link && (
        <List className="share_list">
          <List.Item as="a" href={ facebookURL } target="_blank">
            <List.Icon name="facebook f" size="large" />
            <List.Content>Share on Facebook</List.Content>
          </List.Item>
          <List.Item as="a" href={ tweet } target="_blank">
            <List.Icon name="twitter" size="large" />
            <List.Content>Share on Twitter</List.Content>
          </List.Item>
        </List>
      ) }
      <ClipboardCopy label="Direct Link" copyItem={ directLink } />
    </div>
  );
};

Share.propTypes = {
  id: number,
  site: string,
  language: string,
  link: string,
  title: string
};

export default Share;
