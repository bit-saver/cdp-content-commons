import React, { Component } from 'react';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import SvgIconFile from 'material-ui/svg-icons/editor/insert-drive-file';
import SvgIconInbox from 'material-ui/svg-icons/content/inbox';
import moment from 'moment'
import colors from '../../utils/colors';
import defaultImage from '../../assets/default_image.png';

class ResultItem extends Component {
  render() {
    const item = this.props.item;
    const source = item._source;

    return (
      <Card className="ResultItem__component">
        <a rel="noopener noreferrer" href={source.link} title={source.title} target="_blank">
          <CardMedia
            overlay={<CardTitle subtitle={(
              <div className="ResultItem__overlay">
                <p>{source.domain}</p>
                <Chip backgroundColor={colors.scarlet2} labelColor={colors.white}>
                  <Avatar color={colors.white} style={{ backgroundColor: colors.scarlet1 }} icon={<SvgIconFile />} />
                  {source.type}
                </Chip>
              </div>
            )} />}
          >
            <img
              alt={source.title}
              src={(() => {
                const image = source.featured_image;

                if (image && image.sizes && image.sizes.medium) {
                  return image.sizes.medium.url;
                } else {
                  return defaultImage;
                }
              })()} />
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
          )}
          subtitle={moment(source.published).format('MM.DD.YYYY')} />
        <CardText className="ResultItem__excerpt">{source.excerpt}</CardText>
        <CardActions>
          {source.categories && (
            <div className="ResultItem__categories">
              {
                source.categories.map((cat, index) => {
                  if (index > 1) {
                    return undefined;
                  }
                  return (
                    <Chip
                      key={index}
                      backgroundColor={colors.allPorts2}
                      labelColor={colors.white}
                      className="ResultItem__chip"
                    >
                      <Avatar color={colors.white} style={{ backgroundColor: colors.allPorts1 }} icon={<SvgIconInbox />} />
                      {cat.name}
                    </Chip>
                  );
                })
              }
            </div>
          )}
        </CardActions>
      </Card >
    );
  }
}

export default ResultItem;
