import React from 'react';
import axios from 'axios';

/**
 * Fetches markdown from either the cache (sessionStorage) or via
 * an external url and sets it as a property on wrapped component
 *
 * @param {React component} WrappedComponent
 * @param {string} url
 */
const withMarkdown = ( WrappedComponent, url ) => {
  class HOC extends React.PureComponent {
    state = {
      markdown: '',
      error: false
    };

    componentWillMount() {
      if ( url ) {
        if ( !this.fetchMarkdownFromCache( url ) ) {
          this.fetchMarkdown( url );
        }
      }
    }

    onFetchMarkdown = ( text ) => {
      sessionStorage.setItem( encodeURI( url ), text );
      this.setState( {
        markdown: text
      } );
    }

    fetchMarkdownFromCache( mdUrl ) {
      const cached = sessionStorage.getItem( decodeURI( mdUrl ) );

      if ( cached ) {
        this.setState( { markdown: cached } );
        return true;
      }

      return false;
    }

    fetchMarkdown( mdUrl ) {
      axios.get( mdUrl )
        .then( res => this.onFetchMarkdown( res.data ) )
        .catch( ( err ) => {
          this.setState( {
            error: true
          } );
        } );
    }

    render() {
      return (
        <WrappedComponent
          { ...this.props }
          markdown={ this.state.markdown }
          error={ this.state.error }
        /> );
    }
  }
  return HOC;
};

export default withMarkdown;
