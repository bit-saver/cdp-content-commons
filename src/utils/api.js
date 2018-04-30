import axios from 'axios';
import bodybuilder from 'bodybuilder';

const SEARCH = `${process.env.REACT_APP_PUBLIC_API}/v1/search`;

export const queryRequest = body => axios.post( SEARCH, body ).then( response => response.data );

export const languageAggRequest = async () => {
  const langsWithContent = await axios
    .post( SEARCH, {
      body: bodybuilder()
        .size( 0 )
        .agg( 'terms', 'unit.language.locale.keyword', {}, 'locale' ) // will need to add language.locale for other types
        .build()
    } )
    .then( response => response.data );

  const allLangs = await axios.post( SEARCH, { size: 200, index: 'languages' } ).then( response => response.data );

  return { langsWithContent, allLangs };
};

export const categoryAggRequest = () =>
  axios
    .post( SEARCH, {
      body: bodybuilder()
        .size( 0 )
        .agg( 'terms', 'unit.categories.name.keyword', {}, 'category' )
        .agg( 'terms', 'unit.categories.id.keyword', {}, 'id' )
        .build()
    } )
    .then( response => response.data );

export const sourceAggRequest = () =>
  axios
    .post( SEARCH, {
      body: bodybuilder()
        .size( 0 )
        .agg( 'terms', 'owner.keyword', {}, 'source' )
        .build()
    } )
    .then( response => response.data );

export const typeRecentsRequest = ( currentType, currentLang ) =>
  axios
    .post( SEARCH, {
      body: bodybuilder()
        .size( 3 )
        .query( 'match', 'type', currentType )
        .query( 'query_string', 'query', `(language.locale: ${currentLang} OR unit.language.locale: ${currentLang})` )
        .sort( 'published', 'desc' )
        .build()
    } )
    .then( response => response.data );

export const getItemRequest = ( site, postId ) =>
  axios
    .post( SEARCH, {
      body: bodybuilder()
        .size( 1 )
        .query( 'query_string', 'query', `(site: ${site} AND post_id: ${postId})` )
        .build()
    } )
    .then( response => response.data );

export const categoryBaseRequest = () =>
  axios
    .post( SEARCH, {
      body: bodybuilder()
        .size( 100 )
        .query( 'query_string', 'query', '_type: term AND primary: true' )
        .build()
    } )
    .then( response => response.data );

export const postTypeAggRequest = () =>
  axios
    .post( SEARCH, {
      body: bodybuilder()
        .size( 0 )
        .agg( 'terms', 'type.keyword', {}, 'postType' )
        .build()
    } )
    .then( response => response.data );

export const siteAggRequest = () =>
  axios
    .post( SEARCH, {
      body: bodybuilder()
        .size( 0 )
        .agg( 'terms', 'site.keyword', {}, 'site' )
        .build()
    } )
    .then( response => response.data );
