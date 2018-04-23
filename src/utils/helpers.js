import Bodybuilder from 'bodybuilder';

export const millisToSeconds = ( millis ) => {
  if ( typeof millis !== 'number' ) {
    throw new Error( '_millisToSeconds(): Provided parameter is not a number' );
  }
  return ( ( millis % 60000 ) / 1000 ).toFixed( 2 );
};

export const numberWithCommas = ( number ) => {
  if ( typeof number !== 'number' ) {
    throw new Error( 'Error: Parameter provided is not a number' );
  }
  return number.toString().replace( /\B(?=(\d{3})+(?!\d))/g, ',' );
};

export const getAvailableLanguages = ( item ) => {
  if ( !item || !item.type ) return [];
  switch ( item.type ) {
    case 'video':
      return item.units.map( unit => ( {
        key: unit.language.language_code,
        value: unit.language.display_name,
        text: unit.language.display_name
      } ) );
    case 'post':
      if ( item.languages ) {
        return item.languages.map( post => ( {
          id: post.post_id,
          key: post.language.language_code,
          value: post.language.display_name,
          text: post.language.display_name
        } ) );
      }
      return {
        id: item.post_id,
        key: 'en-us',
        value: 'English',
        text: 'English'
      };
    default:
      return [];
  }
};

export const capitalizeFirst = str => str.substr( 0, 1 ).toUpperCase() + str.substr( 1 );

// Following rules normalize language, categories, tags, etc as they appear at different document levels
const getLanguageQry = language => `(language.locale: ${language.locale} OR unit.language.locale: ${language.locale})`;
const getTagQry = tag => `tags.name.keyword: ${tag}~2 OR unit.tags.name.keyword: ${tag}`;

const getCategoryQry = ( categories ) => {
  let qry = '';
  const len = categories.length;
  categories.forEach( ( category, index ) => {
    qry += `categories.id.keyword: ${category.id} OR unit.categories.id.keyword: ${category.id}`;
    if ( index < len - 1 ) qry += ' OR ';
  } );

  return `(${qry})`;
};

const getPostTypeQry = ( types ) => {
  let qry = '';
  const len = types.length;
  types.forEach( ( type, index ) => {
    qry += `type.keyword: ${type.type}`;
    if ( index < len - 1 ) qry += ' OR ';
  } );

  return `(${qry})`;
};

export const queryBuilder = ( store ) => {
  const body = new Bodybuilder();
  const options = [];
  if ( store.language.currentLanguage ) {
    options.push( getLanguageQry( store.language.currentLanguage ) );
  }

  if ( store.search.author ) {
    options.push( `author.name: ${store.search.author}` );
  }

  if ( store.search.tag ) {
    options.push( getTagQry( store.search.tag ) );
  }

  if ( store.category.currentCategories.length ) {
    options.push( getCategoryQry( store.category.currentCategories ) );
  }

  if ( store.type.currentPostTypes.length ) {
    options.push( getPostTypeQry( store.type.currentPostTypes ) );
  }

  if ( store.site.currentSite ) {
    options.push( `site: ${store.site.currentSite}` );
  }

  if ( store.date.dateSelect ) {
    if ( store.date.dateSelect !== 'custom' ) {
      body.filter( 'range', 'published', { gte: store.date.dateSelect } );
    } else if ( store.date.dateSelect === 'custom' ) {
      body.filter( 'range', 'published', {
        gte: store.date.from,
        lte: store.date.to,
        format: 'MM/dd/yyyy'
      } );
    }
  }

  if ( store.search.sort === 'published' ) {
    body.sort( 'published', 'desc' );
  }

  const optionStr = options.reduce( ( acc, value, index, arr ) => {
    if ( index === arr.length - 1 ) {
      acc += value;
    } else {
      acc += `${value} AND `;
    }
    return acc;
  }, '' );

  // add original search query last
  if ( store.search.query ) {
    body.query( 'query_string', 'query', `${store.search.query} AND (${optionStr})` );
  } else {
    body.query( 'query_string', 'query', optionStr );
  }

  // body.query( 'query_string', 'query', optionStr ); // return all for testing
  return body.build();
};
