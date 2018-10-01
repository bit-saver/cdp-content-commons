import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { func, shape, string, object } from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Form, Input } from 'semantic-ui-react';
import './Search.css';

// Text language detect - move to v2
import axios from 'axios';
import { languages, getDirection } from '../../utils/language';

class Search extends Component {
  constructor( props ) {
    super( props );
    this.URL = `${process.env.REACT_APP_PUBLIC_API}/v1/util/language`;
    this.state = {
      direction: 'left'
    };
  }

  componentDidMount() {
    // Clear session if on home page
    if ( this.props.location.pathname === '/' ) {
      // TODO: cache default query (set up general caching strategy)
      this.props.clearFilters();
      this.props.languageUpdate( { display_name: 'English', key: 'en-us' } );
      this.props.createRequest();
    }
  }


  async fetchTextLanguage( text ) {
    const result = await axios.post( this.URL, { text } );
    const data = ( result && result.data ) ? result.data : null;
    if ( data && data[0] && data[0].language ) {
      const { language } = data[0];
      this.setState( {
        direction: getDirection( language )
      } );
      return ( languages[language] ) ? languages[language] : null;
    }
    return null;
  }

  handleQueryOnChange = async ( e ) => {
    const text = e.target.value;
    this.props.updateSearchQuery( text );
    this.fetchTextLanguage( text )
      .then( ( language ) => {
        if ( language ) {
          this.props.languageUpdate( language );
        }
      } )
      .catch( err => console.log( err ) );
  };

  handleSubmit = ( e ) => {
    e.preventDefault();

    this.props.createRequest();
    this.props.history.push( '/results' );
  };

  render() {
    let inputProps = {};
    if ( this.state.direction === 'left' ) {
      inputProps = { className: 'search_input' };
    } else {
      inputProps = { className: 'search_input right', iconPosition: 'left' };
    }

    return (
      <section className="search_bar">
        <Form onSubmit={ this.handleSubmit }>
          <Input
            onChange={ this.handleQueryOnChange }
            value={ this.props.search.query ? this.props.search.query : '' }
            size="large"
            icon="search"
            placeholder="Type in keywords to search our content"
            { ...inputProps }
          />
          { /* <Form.Group>
            <Form.Input
              placeholder="Type in keywords to search our content"
              className="search_input"
             // onBlur={ this.handleOnBlur }
              onChange={ this.handleQueryOnChange }
              value={ this.props.search.query ? this.props.search.query : '' }
              style={ { textAlign: this.state.textAlign } }
            />
            <Form.Button icon="search" type="submit" />
          </Form.Group> */ }
        </Form>
      </section>
    );
  }
}

const mapStateToProps = state => ( {
  search: state.search
} );

Search.propTypes = {
  updateSearchQuery: func,
  createRequest: func,
  clearFilters: func,
  languageUpdate: func,
  history: object,
  location: object,
  search: shape( {
    query: string
  } )
};

// wrap component in withRouter to get access to history
export default withRouter( connect( mapStateToProps, actions )( Search ) );

