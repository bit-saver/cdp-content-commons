import React, { Component } from 'react';
import { func } from 'prop-types';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import Page from '../PageTmpl';
import config from '../../../config';
import './NotFoundPage.css';

class NotFoundPage extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      content: <div>Loading...</div>
    };
  }

  componentDidMount() {
    this.props.toggleError();

    const cached = this.checkSessionStorage();
    if ( !cached ) {
      axios.get( config.NOTFOUND_URL )
        .then( response => this.onFetchResult( response.data ), error => this.onError( error ) );
    }
  }

  componentWillUnmount() {
    this.props.toggleError();
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
        <section className="notFoundPage">
          { content }
        </section>
      </Page>
    );
  }
}

NotFoundPage.propTypes = {
  toggleError: func
};

export default NotFoundPage;
