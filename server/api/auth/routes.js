const express = require( 'express' );

const router = express.Router();

router.get( '/', ( req, res ) => {
  res.json( { message: 'you are authorized' } );
} );

module.exports = router;
