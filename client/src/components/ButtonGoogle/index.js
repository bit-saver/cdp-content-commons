/**
 *
 * ButtonGoogle
 *
 */

import React from 'react';
import { Button } from 'semantic-ui-react';
import { withFederated } from 'aws-amplify-react';
import PropTypes from 'prop-types';


const ButtonGoogle = props => (
  <Button onClick={ props.googleSignIn }>Log in with America.gov</Button>
);

ButtonGoogle.propTypes = {
  googleSignIn: PropTypes.func
};

export default withFederated( ButtonGoogle );
