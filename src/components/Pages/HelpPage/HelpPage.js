import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Header } from 'semantic-ui-react';
import Breadcrumbs from '../../Breadcrumbs';
import config from '../../../config';
import './HelpPage.css';

class HelpPage extends Component {
  componentWillMount() {
    const cachedHelp = sessionStorage.getItem( 'HelpPage' );
    if ( cachedHelp ) {
      this.setState( { markdown: cachedHelp } );
      return;
    }

    fetch( config.HELP_URL )
      .then( response => response.text() )
      .then( text => this.onFetchResult( text ) );
  }

  componentDidMount() {
    window.scrollTo( 0, 0 );
  }

  onFetchResult = ( text ) => {
    sessionStorage.setItem( 'HelpPage', text );
    this.setState( {
      markdown: text
    } );
  }

  render() {
    if ( this.state ) {
      const { markdown } = this.state;
      return (
        <section className="help">
          <Breadcrumbs />
          <Header as="h1">
            Help
            <Header.Subheader>Common questions and solutions for Content Commons.</Header.Subheader>
          </Header>
          <ReactMarkdown source={ markdown } />
        </section>
      );
    }
    return <div />;
  }
}

export default HelpPage;
