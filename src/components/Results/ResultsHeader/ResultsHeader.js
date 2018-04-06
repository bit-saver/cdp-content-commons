import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { numberWithCommas } from '../../../utils/helpers';
import { sortRequest } from '../../../actions/search';
// import { Form, Select } from 'semantic-ui-react';
import ResultsToggleView from '../ResultsToggleView';
import './ResultsHeader.css';

/** **
TEMP
**** */
// const options = [{ key: 1, text: 'Relevance', value: 'relevance' }, { key: 2, text: 'Recent', value: 'published' }];
/** * */

class ResultsHeader extends Component {
  constructor( props ) {
    super( props );
    this.handleOnChange = this.handleOnChange.bind( this );
  }

  handleOnChange( event, { value } ) {
    this.props.sortRequest( value );
  }

  render() {
    const { currentPage, total } = this.props.search;

    if ( this.props.search.response.took && this.props.search.response.hits.hits.length ) {
      return (
        <div className="results_header">
          { currentPage === 1 ? (
            <p className="results_total">About { numberWithCommas( total ) } results</p>
          ) : (
            <p className="results_total">
              Page { currentPage } of about { total } results
            </p>
          ) }

          { /* <Form>
            <Form.Group className="results_sort">
              <Form.Field
                control={ Select }
                label="Sort By"
                value={ sort }
                options={ options }
                onChange={ this.handleOnChange }
              />
            </Form.Group>
          </Form> */ }

          <ResultsToggleView toggle={ this.props.toggleView } />
        </div>
      );
    }

    return <div />;
  }
}

const mapStateToProps = state => ( {
  search: state.search
} );

ResultsHeader.propTypes = {
  search: object,
  sortRequest: func,
  toggleView: func
};

export default connect( mapStateToProps, { sortRequest } )( ResultsHeader );
