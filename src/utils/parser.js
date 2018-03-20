import iconPost from '../assets/images/icon_32px_post.png';
import iconCourse from '../assets/images/icon_32px_course.png';
import iconAudio from '../assets/images/icon_32px_audio.png';
import iconVideo from '../assets/images/icon_32px_video.png';

import thumbnailPost from '../assets/images/thumbnail_post.jpg';
import thumbnailCourse from '../assets/images/thumbnail_course.jpg';
import thumbnailAudio from '../assets/images/thumbnail_audio.jpg';
import thumbnailVideo from '../assets/images/thumbnail_video.jpg';

const getIcon = ( type ) => {
  let icon = '';
  switch ( type ) {
    case 'course':
      icon = iconCourse;
      break;
    case 'podcast':
      icon = iconAudio;
      break;
    case 'video':
      icon = iconVideo;
      break;
    default:
      icon = iconPost;
  }

  return icon;
};

const getDefaultThumbnail = ( type ) => {
  let thumbnail = '';
  switch ( type ) {
    case 'course':
      thumbnail = thumbnailCourse;
      break;
    case 'podcast':
      thumbnail = thumbnailAudio;
      break;
    case 'video':
      thumbnail = thumbnailVideo;
      break;
    default:
      thumbnail = thumbnailPost;
  }

  return thumbnail;
};

const getThumbnail = ( source ) => {
  let thumbnail = '';
  const image = source.featured_image;
  if ( image && image.sizes && image.sizes.medium ) {
    thumbnail = image.sizes.medium.url;
  } else {
    thumbnail = getDefaultThumbnail( source.type );
  }

  return thumbnail;
};

const populateVideoItem = ( source ) => {
  const units = source.unit;
  const defaultUnit = units.find( unit => unit.language.locale === 'en-US' );
  let obj = {};

  if ( defaultUnit ) {
    obj = {
      title: defaultUnit.title,
      description: defaultUnit.desc,
      thumbnail:
        defaultUnit.source && defaultUnit.source.stream && defaultUnit.source.stream.thumbnail
          ? defaultUnit.source.stream.thumbnail
          : getDefaultThumbnail( source.type ),
      categories: defaultUnit.categories || [],
      tags: defaultUnit.tags || [],
      duration: source.duration
    };
  }

  return obj;
};

const populateItem = ( source ) => {
  const obj = {
    title: source.title,
    description: source.excerpt,
    thumbnail: getThumbnail( source ),
    categories: source.categories || []
  };

  return obj;
};

const getTypeSpecObj = ( source ) => {
  let obj;

  switch ( source.type ) {
    case 'video':
      obj = populateVideoItem( source );
      break;

    case 'post':
    case 'course':
      obj = populateItem( source );
      break;

    default:
      obj = {};
  }

  return obj;
};

export const normalizeItem = ( item ) => {
  const source = item._source;

  const obj = {
    id: source.post_id,
    site: source.site,
    sourcelink: `https://${source.site}`,
    type: source.type,
    icon: getIcon( item.type ),
    author: source.author.name || source.author, // make video obj  w/id & name to be consistent??
    link: source.link || '',
    published: source.published,
    modified: source.modified
  };

  const typeSpecificObj = getTypeSpecObj( source );

  return { ...obj, ...typeSpecificObj };
};
