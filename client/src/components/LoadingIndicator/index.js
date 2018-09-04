/**
 *
 * LoadingIndicator
 * Note: Could use <Loader />  from semantic straight away but created
 * this component in the event we want to do a custom loader
 *
 */

import React from 'react';
import { Loader } from 'semantic-ui-react';
// import './LoadingIndicator.css';

const LoadingIndicator = props => (
  <Loader active />
);

LoadingIndicator.propTypes = {};

export default LoadingIndicator;
