import React, { Component } from 'react';
import { object, func, string } from 'prop-types';
import { connect } from 'react-redux';
import { numberWithCommas } from '../../../utils/helpers';
import { sortRequest } from '../../../actions/search';
import { Form, Select, Dropdown } from 'semantic-ui-react';
import ResultsToggleView from '../ResultsToggleView';
import './ResultsHeader.css';

/** **
TEMP
**** */
const options = [{ key: 1, text: 'Relevance', value: 'relevance' }, { key: 2, text: 'Recent', value: 'published' }];
/** * */

class ResultsHeader extends Component {
  constructor( props ) {
    super( props );
    this.handleOnChange = this.handleOnChange.bind( this );
    this.toggleNumberOfResults = this.toggleNumberOfResults.bind( this );
  }

  handleOnChange( event, { value } ) {
    this.props.sortRequest( value );
  }

  toggleNumberOfResults( e, { value } ) {
    console.log( this );
    console.log( 'value: ', value );
  }

  render() {
    const {
      currentPage,
      total,
      startIndex,
      endIndex,
      sort
    } = this.props.search;
    const { toggleView, currentView } = this.props;
    const resultItemsStart = startIndex + 1;
    const resultItemsEnd = endIndex + 1;

    const numOfResultsDisplay = [
      { text: '12', value: 12 },
      { text: '24', value: 24 },
      { text: '36', value: 36 },
      { text: '48', value: 48 }
    ];

    if ( this.props.search.response.took && this.props.search.response.hits.hits.length ) {
      return (
        <div>
          <ResultsToggleView toggle={ toggleView } currentView={ currentView } />
          <div className="results_header">
            <Form className="results_sort">
              <Form.Group>
                <Form.Field
                  control={ Select }
                  value={ sort }
                  options={ options }
                  onChange={ this.handleOnChange }
                />
              </Form.Group>
            </Form>

            { currentPage === 1 ? (
              <div className="results_total">
                { resultItemsStart }-{ resultItemsEnd } of { numberWithCommas( total ) } |
                Show:
                <Dropdown
                  defaultValue={ numOfResultsDisplay[0].value }
                  options={ numOfResultsDisplay }
                  className="results_total_numOfResults"
                  onChange={ this.toggleNumberOfResults }
                />
              </div>
            ) : (
              <p className="results_total">
                Page { currentPage } of about { total } results
              </p>
            ) }
          </div>
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
  toggleView: func,
  currentView: string
};

export default connect( mapStateToProps, { sortRequest } )( ResultsHeader );
