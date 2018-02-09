import React, { Component } from 'react';
import moment from 'moment'
import defaultImage from '../../assets/default_image.png';
import postImage from '../../assets/content_icons_32px_article.png';
import courseImage from '../../assets/content_icons_32px_course.png';
import podcastImage from '../../assets/content_icons_32px_podcast.png';
import videoImage from '../../assets/content_icons_32px_video.png';
import cardDownloadIcon from '../../assets/Card_Download_Icon.svg';
import cardShareIcon from '../../assets/Card_Share_Icon.svg';
import { Card, Image } from 'semantic-ui-react';


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
          <Image src={cardImageSrc}
          />
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
          <span className='card_icon card_icon--download'>
            <Image src={cardDownloadIcon} />  
          </span>
        </Card.Content> 
      </Card>
    );
  }
}

export default ResultItem;
