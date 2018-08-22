import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import JSZipUtils from 'jszip-utils';

const urlToPromise = url =>
  new Promise( ( resolve, reject ) => {
    JSZipUtils.getBinaryContent( url, ( err, data ) => {
      if ( err ) {
        reject( err );
      } else {
        resolve( data );
      }
    } );
  } );

export const create = ( urls, fn, cb ) => {
  const zip = new JSZip();

  urls.forEach( ( url ) => {
    const filename = url.replace( /.*\//g, '' );
    zip.file( filename, urlToPromise( url ), { binary: true } );
  } );

  zip
    .generateAsync( { type: 'blob' }, ( metadata ) => {
      cb( metadata.percent.toFixed( 2 ) );
    } )
    .then(
      ( blob ) => {
        saveAs( blob, `${fn}.zip` );
      },
      ( err ) => {
        console.log( 'error' );
      }
    );
};
