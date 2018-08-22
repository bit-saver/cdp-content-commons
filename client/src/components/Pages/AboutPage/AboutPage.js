import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Header } from 'semantic-ui-react';
import Page from '../PageTmpl';
import Breadcrumbs from '../../Breadcrumbs';
import config from '../../../config';

class AboutPage extends Component {
  componentWillMount() {
    const cachedAbout = sessionStorage.getItem( 'AboutPage' );
    if ( cachedAbout ) {
      this.setState( { markdown: cachedAbout } );
      return;
    }

    fetch( config.ABOUT_URL )
      .then( response => response.text() )
      .then( text => this.onFetchResult( text ) );
  }

  onFetchResult = ( text ) => {
    sessionStorage.setItem( 'AboutPage', text );
    this.setState( {
      markdown: text
    } );
  }

  render() {
    if ( this.state ) {
      const { markdown } = this.state;
      return (
        <Page>
          <Breadcrumbs />
          <Header as="h1">About Content Commons</Header>
          <ReactMarkdown source={ markdown } />
        </Page>
      );
    }
    return <div />;
  }
}

export default AboutPage;
