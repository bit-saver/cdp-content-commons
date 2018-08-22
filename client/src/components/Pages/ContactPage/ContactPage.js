import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Header } from 'semantic-ui-react';
import Page from '../PageTmpl';
import Breadcrumbs from '../../Breadcrumbs';
import config from '../../../config';

class ContactPage extends Component {
  componentWillMount() {
    const cachedContact = sessionStorage.getItem( 'ContactPage' );
    if ( cachedContact ) {
      this.setState( { markdown: cachedContact } );
      return;
    }

    fetch( config.CONTACT_URL )
      .then( response => response.text() )
      .then( text => this.onFetchResult( text ) );
  }

  onFetchResult = ( text ) => {
    sessionStorage.setItem( 'ContactPage', text );
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
          <Header as="h1">Contact Us</Header>
          <ReactMarkdown source={ markdown } />
        </Page>
      );
    }
    return <div />;
  }
}

export default ContactPage;
