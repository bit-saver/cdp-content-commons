/**
 *
 * SearchBar
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectSearchBar from './selectors';
import { Form } from 'semantic-ui-react';

import './SearchBar.css';

const SearchBar = ( props ) => {
  const handleQueryOnChange = ( e ) => {
    // this.props.updateSearchTerm( e.target.value );
  };

  const handleSubmit = ( e ) => {
    e.preventDefault();
    // this.props.createRequest();
    // this.props.history.push( '/search' );
  };

  return (
    <section className="search_bar">
      <Form onSubmit={ handleSubmit }>
        <Form.Group>
          <Form.Input
            placeholder="Type in keywords to search our content"
            className="search_input"
            onChange={ handleQueryOnChange }
            value={ props.searchTerm ? props.searchTerm : '' }
          />
          <Form.Button icon="search" type="submit" />
        </Form.Group>
      </Form>
    </section>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  searchbar: makeSelectSearchBar()
} );

export default withRouter( connect( mapStateToProps, actions )( SearchBar ) );
