require( 'dotenv' ).config();

const path = require( 'path' );
const express = require( 'express' );
const middlewareSetup = require( './middleware' );

const app = express();
middlewareSetup( app );

const api = require( './api' );

// set up routes
app.use( '/v1/api', api );

if ( ['production'].includes( process.env.NODE_ENV ) ) {
  app.use( express.static( 'client/build' ) );

  app.get( '*', ( req, res ) => {
    res.sendFile( path.resolve( 'client', 'build', 'index.html' ) );
  } );
}

const PORT = process.env.PORT || 5000;
app.listen( PORT, () => {
  console.log( 'Listening on port', PORT );
} );


module.exports = app; // for testing
