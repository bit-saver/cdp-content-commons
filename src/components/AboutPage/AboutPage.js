import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Header } from 'semantic-ui-react';
import Breadcrumbs from '../Breadcrumbs';
import config from '../../config';
import './AboutPage.css';

class AboutPage extends Component {
  componentWillMount() {
    fetch( config.ABOUT_URL )
      .then( response => response.text() )
      .then( ( text ) => {
        this.setState( {
          markdown: text
        } );
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
