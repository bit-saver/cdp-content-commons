import React, { Component } from 'react';
import { object, func, string } from 'prop-types';
import { connect } from 'react-redux';
import { numberWithCommas } from '../../../utils/helpers';
import { sortRequest, updateSizeRequest } from '../../../actions/search';
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
    const { pageSize } = this.props.search;
    this.props.sortRequest( value, pageSize );
  }

  toggleNumberOfResults( e, { value } ) {
    this.props.updateSizeRequest( value );
  }

  render() {
    const {
      total,
      startIndex,
      endIndex,
      sort
    } = this.props.search;
    const { toggleView, currentView } = this.props;
    const resultItemsStart = startIndex + 1;
    const resultItemsEnd = endIndex + 1;

    const numOfResultsDisplay = [
      { text: '1', value: 1 },
      { text: '2', value: 2 },
      { text: '4', value: 4 },
      { text: '8', value: 8 }
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
            <div className="results_total">
              { resultItemsStart }-{ resultItemsEnd } of { numberWithCommas( total ) } |
              Show: <Dropdown
                defaultValue={ numOfResultsDisplay[0].value }
                options={ numOfResultsDisplay }
                className="results_total_numOfResults"
                onChange={ this.toggleNumberOfResults }
              />
            </div>

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
  updateSizeRequest: func,
  toggleView: func,
  currentView: string
};

export default connect( mapStateToProps, { sortRequest, updateSizeRequest } )( ResultsHeader );
