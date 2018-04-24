import iconPost from '../assets/icons/icon_32px_post.png';
import iconCourse from '../assets/icons/icon_32px_course.png';
import iconAudio from '../assets/icons/icon_32px_audio.png';
import iconVideo from '../assets/icons/icon_32px_video.png';

import thumbnailPost from '../assets/images/thumbnail_post.jpg';
import thumbnailCourse from '../assets/images/thumbnail_course.jpg';
import thumbnailAudio from '../assets/images/thumbnail_audio.jpg';
import thumbnailVideo from '../assets/images/thumbnail_video.jpg';

import store from '../utils/store';

const getIcon = ( type ) => {
  let icon = '';
  switch ( type ) {
    case 'course':
      icon = iconCourse;
      break;
    case 'audio':
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
  const { thumbnail } = source;
  const image = source.featured_image;

  if ( thumbnail ) {
    if ( thumbnail.medium && thumbnail.medium.url ) {
      return thumbnail.medium.url;
    }

    if ( thumbnail.small && thumbnail.small.url ) {
      return thumbnail.small.url;
    }

    if ( thumbnail.large && thumbnail.large.url ) {
      return thumbnail.large.url;
    }

    if ( thumbnail.full && thumbnail.full.url ) {
      return thumbnail.full.url;
    }
  } else if ( image && image.sizes && image.sizes.medium ) {
    return image.sizes.medium.url;
  }

  return null;
};

const getThumbnailFromVideo = ( source ) => {
  let thumbnail = '';

  const vidSrc = source[0];
  if ( vidSrc && vidSrc.stream && vidSrc.stream.thumbnail ) {
    // eslint-disable-next-line prefer-destructuring
    thumbnail = vidSrc.stream.thumbnail;
  }
  return thumbnail || getDefaultThumbnail( 'video' );
};

const getAuthor = ( author ) => {
  if ( !author ) return '';
  return author.name || author;
};

// send in locale to fetch applicable lang data props?
const populateVideoItem = ( source ) => {
  const { locale } = store.getState().language.currentLanguage;
  const thumbnail = getThumbnail( source );
  const units = source.unit;
  const languageUnit = units.find( unit => unit.language.locale.toLowerCase() === locale.toLowerCase() );
  let obj = {};

  if ( languageUnit ) {
    obj = {
      title: languageUnit.title || '[TITLE]',
      description: languageUnit.desc || '',
      thumbnail: thumbnail || getThumbnailFromVideo( languageUnit.source ),
      categories: languageUnit.categories || [],
      tags: languageUnit.tags || [],
      duration: source.duration,
      units,
      selectedLanguageUnit: languageUnit
    };
  } else {
    // this may not be needed
    obj = {
      title: '[TITLE]',
      description: '',
      thumbnail: getDefaultThumbnail( 'video' ),
      categories: [],
      tags: [],
      duration: '',
      units: []
    };
  }

  return obj;
};

const populateItem = ( source ) => {
  const obj = {
    title: source.title,
    description: source.excerpt,
    content: source.content,
    thumbnail: getThumbnail( source ) || getDefaultThumbnail( source.type ),
    categories: source.categories || [],
    language: source.language,
    languages: source.languages || []
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

export const normalizeItem = ( item, language ) => {
  const source = item._source;

  const obj = {
    id: source.post_id ? source.post_id : source.id,
    site: source.site,
    sourcelink: `https://${source.site}`,
    type: source.type,
    icon: getIcon( source.type ),
    author: getAuthor( source.author ), // make video obj  w/id & name to be consistent??
    link: source.link || '',
    published: source.published,
    modified: source.modified
  };

  const typeSpecificObj = getTypeSpecObj( source );

  return { ...obj, ...typeSpecificObj };
};
