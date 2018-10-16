import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import Page from '../PageTmpl';
import config from '../../../config';
import './NotFoundPage.css';

class NotFoundPage extends Component {
  constructor() {
    super();
    this.state = {
      content: <div>Loading...</div>
    };
  }

  componentDidMount() {
    const cached = this.checkSessionStorage();
    if ( !cached ) {
      axios.get( config.NOTFOUND_URL )
        .then( response => this.onFetchResult( response.data ), error => this.onError( error ) );
    }
  }

  onFetchResult = ( result ) => {
    sessionStorage.setItem( 'NotFoundPage', result );
    this.setState( {
      content: <ReactMarkdown source={ result } />
    } );
  }

  onError = ( error ) => {
    this.setState( {
      content: config.ERROR_MESSAGE
    } );
  }

  checkSessionStorage() {
    const cachedNotFound = sessionStorage.getItem( 'NotFoundPage' );
    if ( cachedNotFound ) {
      this.setState( { content: <ReactMarkdown source={ cachedNotFound } /> } );
      return true;
    }
    return false;
  }

  render() {
    const { content } = this.state;
    return (
      <Page>
        { content }
      </Page>
    );
  }
}

export default NotFoundPage;
