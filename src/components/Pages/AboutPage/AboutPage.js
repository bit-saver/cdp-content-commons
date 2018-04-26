import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Header } from 'semantic-ui-react';
import Breadcrumbs from '../../Breadcrumbs';
import config from '../../../config';
import './AboutPage.css';

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

  componentDidMount() {
    window.scrollTo( 0, 0 );
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
        <section className="about">
          <Breadcrumbs />
          <Header as="h1">About Content Commons</Header>
          <ReactMarkdown source={ markdown } />
        </section>
      );
    }
    return <div />;
  }
}

export default AboutPage;
