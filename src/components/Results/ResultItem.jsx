import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import moment from 'moment'
import defaultImage from '../../assets/default_image.png';
import postImage from '../../assets/content_icons_32px_article.png';
import courseImage from '../../assets/content_icons_32px_course.png';
import podcastImage from '../../assets/content_icons_32px_podcast.png';
import videoImage from '../../assets/content_icons_32px_video.png';
import './Results.css';

class ResultItem extends Component {
  render() {
    const item = this.props.item;
    const source = item._source;
    const sourcelink = 'https://' + source.site;
    let iconImage;

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
      <Card className="ResultItem__component">
        <a rel="noopener noreferrer" href={source.link} title={source.title} target="_blank">
          <CardMedia
            overlay={
              <div className="ResultItem__overlay">
                <Avatar size={32} backgroundColor='transparent' src={iconImage} style={{opacity: '0.8'}} />
              </div>
            }
            className="ResultItem__cardMedia"
            overlayContentStyle={{background: 'transparent'}}>
            <div className="ResultItem__featured" style={{
              backgroundImage: `url(${(() => {
                const image = source.featured_image;

                if (image && image.sizes && image.sizes.medium) {
                  return image.sizes.medium.url;
                } else {
                  return defaultImage;
                }
              })()})`
            }}>
            </div>
          </CardMedia>
        </a>
        <CardTitle
          titleStyle={{ fontFamily: 'Merriweather' }}
          title={(
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={source.link}
              title={source.title}>
              {source.title}
            </a>
          )} />

        <CardText
          className="ResultItem__excerpt"
          style={{ padding: '0 16px' }}
          >{source.excerpt}
        </CardText>
        <CardText 
          className="ResultItem__date" 
          style={{ padding: '16px 16px 4px', fontSize: '12px' }}
          >{moment(source.published).format('MMMM DD, YYYY')}
        </CardText>
        <CardText 
          className="ResultItem__source"
          style={{ padding: '0px 16px 4px', fontSize: '12px' }}>
          <a target="_blank" rel="noopener noreferrer" href={sourcelink}>{source.site}</a>
        </CardText>
        {source.categories && (
          <CardText 
            className="ResultItem__categories"
            style={{ padding: '0px 16px 4px', fontSize: '12px' }}>
            {
              source.categories.map((cat, index) => {
                if (index > 2) {
                  return undefined;
                }
                if (source.categories.length - 1 !== index && index < 2) {
                  cat.name = cat.name + '  ·';
                }
                return (
                  <span
                    key={index}
                    className="ResultItem__category">
                    {cat.name.toLowerCase()}
                  </span>
                );
              })
            }
          </CardText>
        )}
      </Card>
    );
  }
}

export default ResultItem;
