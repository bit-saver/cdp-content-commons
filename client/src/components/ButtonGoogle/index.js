import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class ButtonGoogle extends Component {
  constructor( props ) {
    super( props );
    this.initGapi = this.initGapi.bind( this );
  }

  /**
   * If a google client id is present, add google script
   */
  componentDidMount() {
    const { clientid } = this.props;
    if ( clientid ) this.createScript();
  }


  /**
   * Adds the google script to the page
   */
  createScript() {
    const script = document.createElement( 'script' );
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.onload = this.initGapi;
    document.body.appendChild( script );
  }

  /**
   * Initiate the google api passing in the 'america.gov'
   * hosted domain to limit authentication to america.gov accounts onlu
   */
  initGapi() {
    const { clientid } = this.props;
    const g = window.gapi;
    g.load( 'auth2', () => {
      g.auth2.init( {
        client_id: clientid,
        scope: 'profile email openid',
        hosted_domain: 'america.gov'
      } );
    } );
  }

  render() {
    const ga = window.gapi && window.gapi.auth2
      ? window.gapi.auth2.getAuthInstance()
      : null;

    return <Button { ...this.props } >{ this.props.children }</Button>;
  }
}

ButtonGoogle.propTypes = {
  clientid: PropTypes.string,
  children: PropTypes.node
};


export default ButtonGoogle;
