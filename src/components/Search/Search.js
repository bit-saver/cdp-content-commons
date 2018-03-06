import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { func, shape, string, object } from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Form } from 'semantic-ui-react';
import './Search.css';

class Search extends Component {
  constructor( props ) {
    super( props );
    this.handleQueryOnChange = this.handleQueryOnChange.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
  }

  componentWillMount() {
    this.props.loadLanguages();
    this.props.loadPostTypes();
    this.props.loadSites();
  }

  handleQueryOnChange( e ) {
    this.props.updateSearchQuery( e.target.value );
  }

  handleSubmit( e ) {
    e.preventDefault();
    if ( !this.props.search.query ) {
      return;
    }
    this.props.createRequest();
    this.props.history.push( '/results' );
  }

  render() {
    return (
      <section>
        <div className="search_bar">
          <Form onSubmit={ this.handleSubmit }>
            <Form.Group>
              <Form.Input
                placeholder="Search..."
                className="search_input"
                onChange={ this.handleQueryOnChange }
                value={ this.props.search.query ? this.props.search.query : '' }
              />
              <Form.Button icon="search" type="submit" />
            </Form.Group>
          </Form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ( {
  search: state.search
} );

Search.propTypes = {
  loadLanguages: func,
  loadPostTypes: func,
  loadSites: func,
  updateSearchQuery: func,
  createRequest: func,
  history: object,
  search: shape( {
    query: string
  } )
};

// wrap component in withRouter to get access to history
export default withRouter( connect( mapStateToProps, actions )( Search ) );
