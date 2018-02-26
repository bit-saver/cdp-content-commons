import React, { Component } from 'react';
import moment from 'moment'
import defaultImage from '../../assets/images/default_image.png';
import postImage from '../../assets/images/content_icons_32px_article.png';
import courseImage from '../../assets/images/content_icons_32px_course.png';
import podcastImage from '../../assets/images/content_icons_32px_podcast.png';
import videoImage from '../../assets/images/content_icons_32px_video.png';
import cardShareIcon from '../../assets/images/Card_Share_Icon.svg';
import { Card, Image } from 'semantic-ui-react';
import VideoDownloadPopup from '../Popup/Video/VideoDownloadPopup';


class ResultItem extends Component {    
  render() {
    const item = this.props.item;
    const source = item._source;
    const sourcelink = 'https://' + source.site;
    let iconImage;
    let cardImageSrc;

    const image = source.featured_image;            
    if (image && image.sizes && image.sizes.full) {
      cardImageSrc = image.sizes.full.url;
    } else {
      cardImageSrc = defaultImage;
    }

    switch(source.type) {
      case 'post':
        iconImage = postImage;
        break;
      case 'course':
        iconImage = courseImage;
        break;
      case 'podcast':
        iconImage = podcastImage;
        break;
      case 'video': 
        iconImage = videoImage;
        break;
      default:
        iconImage = postImage;
    }

    return (      
      <Card>
        <a rel='noopener noreferrer' href={source.link} title={source.title} target='_blank'>
          <Image src={cardImageSrc} />
          <Image src={iconImage} className='card_postIcon' />                              
        </a>
        <Card.Content>          
          <Card.Header className='card_header'>
            <a rel='noopener noreferrer' href={source.link} title={source.title} target='_blank'>{source.title}</a>
          </Card.Header>          
          <Card.Description className='card_excerpt'>
            {source.excerpt}
          </Card.Description>
          
          <div className='card_metadata'>
            <Card.Meta>
              {moment(source.published).format('MMMM DD, YYYY')}
            </Card.Meta>
            <Card.Meta>
              <a target="_blank" rel="noopener noreferrer" href={sourcelink}>{source.site}</a>
            </Card.Meta>           

            {source.categories && (
            <Card.Meta>            
              {
                source.categories.map((cat, index) => {
                  if (index > 2) {
                    return undefined;
                  }
                  if (source.categories.length - 1 !== index && index < 2) {
                    cat.name = cat.name + '  ·';
                  }
                  return (
                    <span key={index}>{cat.name.toLowerCase()}</span>
                  );
                })
              }
            </Card.Meta>          
            )}
          </div>
        </Card.Content> 
        <Card.Content extra>
          <span className='card_icon card_icon--share'>          
            <Image src={cardShareIcon} />
          </span>         
          <VideoDownloadPopup />
        </Card.Content> 
      </Card>
    );
  }
}

export default ResultItem;
