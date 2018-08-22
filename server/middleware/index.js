const morgan = require( 'morgan' );
const compression = require( 'compression' );
const bodyParser = require( 'body-parser' );
const helmet = require( 'helmet' );
const logger = require( '../logger' );

/**
 * Configures middleware
 *
 * @param {*} app express app
 */
const middlewareSetup = ( app ) => {
  app.use( compression() );
  app.use( helmet() );
  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded( { extended: true } ) );

  if ( process.env.NODE_ENV === 'production' ) {
    app.use( morgan( 'combined' ) );
  } else {
    app.use( morgan( 'combined', { stream: logger.stream } ) );
  }
};

module.exports = middlewareSetup;
