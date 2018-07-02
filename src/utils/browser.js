/*
 * This detection method identifies Internet Explorers up until version 11.
 *
 * Reference: https://msdn.microsoft.com/en-us/library/ms537503(v=vs.85).aspx
 */
export const isInternetExplorerBefore = ( version ) => {
  const iematch = /MSIE ([0-9]+)/g.exec( window.navigator.userAgent );

  return iematch ? +iematch[1] < version : false;
};

/**
 * Updates a url without reloading the page.  Uses replaceState to replace
 * the hostroy object instead of adding a new item to history
 *
 * @param {string} url new location
 */
export const updateUrl = ( url ) => {
  window.history.replaceState( {}, '', url );
};

export const parseQueryString = ( source ) => {
  const map = {};

  if ( source === '' ) {
    return;
  }

  let groups = source;

  if ( groups.indexOf( '?' ) === 0 ) {
    groups = groups.substr( 1 );
  }
  groups = groups.split( '&' );

  groups.forEach( ( group ) => {
    const pairs = group.split(
      '=',
      // For: xxx=, Prevents: [xxx, ""], Forces: [xxx]
      ( group.slice( -1 ) !== '=' ) + 1
    );
    const [key, value] = pairs;
    if ( key ) {
      map[decodeURIComponent( key )] = typeof value === 'undefined' ? value : decodeURIComponent( value );
    }
  } );

  return map;
};

export const stringifyQueryString = obj =>
  Object.keys( obj )
    .map( k => `${encodeURIComponent( k )}=${encodeURIComponent( obj[k] )}` )
    .join( '&' );
