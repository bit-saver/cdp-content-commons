const express = require( 'express' );
const logger = require( '../logger' );
const authRoutes = require( './auth/routes.js' );

const router = express.Router();

router.use( '/auth', authRoutes );

// Generic error handler
router.use( ( err, req, res, next ) => {
  logger.error( err.stack );
  res.status( 500 ).json( err.toString() );
} );


module.exports = router;
