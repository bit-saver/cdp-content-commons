import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Header } from 'semantic-ui-react';
import axios from 'axios';

import Page from '../PageTmpl';
import Breadcrumbs from '../../Breadcrumbs';

import config from '../../../config';

class PrivacyPage extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      markdown: null
    };
  }

  componentDidMount() {
    window.scrollTo( 0, 0 );
    const cached = this.checkSessionStorage();
    if ( !cached ) {
      axios.get( config.PRIVACY_URL )
        .then( response => this.onFetchResult( response.data ), error => this.onError( error ) );
    }
  }

  onFetchResult = ( result ) => {
    sessionStorage.setItem( 'PrivacyPage', result );
    this.setState( {
      isLoaded: true,
      markdown: result
    } );
  }

  onError = ( error ) => {
    this.setState( {
      isLoaded: true,
      error
    } );
  }

  checkSessionStorage() {
    const cachedPrivacy = sessionStorage.getItem( 'PrivacyPage' );
    if ( cachedPrivacy ) {
      this.setState( { isLoaded: true, markdown: cachedPrivacy } );
      return true;
    }
    return false;
  }

  render() {
    const { error, isLoaded, markdown } = this.state;
    if ( error ) {
      return (
        <Page>
          <Breadcrumbs />
          <Header as="h1">Privacy Policy</Header>
          <div>
            Oops! Something went wrong. If this issue persists,
            please email the IIP Office of Design at <a href="mailto:design@america.gov">design@america.gov</a>.
          </div>
        </Page>
      );
    } else if ( !isLoaded ) {
      return (
        <Page>
          <Breadcrumbs />
          <Header as="h1">Privacy Policy</Header>
          <div>Loading...</div>
        </Page>
      );
    }
    return (
      <Page>
        <Breadcrumbs />
        <Header as="h1">Privacy Policy</Header>
        <ReactMarkdown source={ markdown } />
      </Page>
    );
  }
}

export default PrivacyPage;
