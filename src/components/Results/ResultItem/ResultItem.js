import React, { Component } from 'react';
import { object } from 'prop-types';
import moment from 'moment';
import { Card, Image, Modal } from 'semantic-ui-react';

import PopupTrigger from '../../Popup/PopupTrigger';
import PopupTabbed from '../../Popup/PopupTabbed';

import ClosedCaptions from '../../Video/ClosedCaptions';
import OpenCaptions from '../../Video/OpenCaptions';
import DownloadMore from '../../Video/DownloadMore';
import DownloadHelp from '../../Video/DownloadHelp';

import Shortcode from '../../Video/Shortcode';
import Social from '../../Video/Social';

import VideoModal from '../../Modals/Video/VideoModal';

import './ResultItem.css';

class ResultItem extends Component {
  // eslint-disable-next-line class-methods-use-this
  renderCategory( category, index, arr ) {
    let { name } = category;
    const key = `cat_${index}`;
    if ( index > 2 ) {
      return undefined;
    }
    if ( arr.length - 1 !== index && index < 2 ) {
      name += '  ·';
    }

    return <span key={ key }>{ name.toLowerCase() }</span>;
  }

  render() {
    const { item } = this.props;
    return (
      <Card>
        <Modal
          closeIcon
          trigger={
            <div className="card_imgWrapper">
              <Image src={ item.thumbnail } width="100%" height="100%" />
              <Image src={ item.icon } className="card_postIcon" />
            </div>
          }
        >
          <Modal.Content><VideoModal item={ item } /></Modal.Content>
        </Modal>
        <Card.Content>
          <Card.Header className="card_header">
            <Modal
              closeIcon
              trigger={
                <p>{ item.title }</p>
              }
            >
              <Modal.Content><VideoModal item={ item } /></Modal.Content>
            </Modal>
          </Card.Header>
          <Card.Description className="card_excerpt">{ item.excerpt }</Card.Description>
          <div className="card_metadata">
            <Card.Meta>{ moment( item.published ).format( 'MMMM DD, YYYY' ) }</Card.Meta>
            <Card.Meta>
              <a target="_blank" rel="noopener noreferrer" href={ item.sourcelink }>
                { item.site }
              </a>
            </Card.Meta>
            <Card.Meta>{ item.categories && item.categories.map( this.renderCategory ) }</Card.Meta>
          </div>
        </Card.Content>
        <Card.Content extra>
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
        </Card.Content>
      </Card>
    );
  }
}

ResultItem.propTypes = {
  item: object
};

export default ResultItem;
