import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../actions/search';
import './ResultsPagination.css';

import { Pagination } from 'semantic-ui-react';

class ResultsPagination extends Component {
  handlePaginationChange = ( e, { activePage } ) => this.props.targetRequest( activePage );

  render() {
    if ( this.props.search.totalPages > 1 ) {
      const nextDisabled = this.props.search.currentPage === this.props.search.totalPages;
      const prevDisabled = this.props.search.currentPage === 1;
      return (
        <section className="resultsPagination">
          <Pagination
            nextItem={ { content: 'Next ⟩', disabled: nextDisabled } }
            prevItem={ { content: '⟨ Previous', disabled: prevDisabled } }
            activePage={ this.props.search.currentPage }
            onPageChange={ this.handlePaginationChange }
            totalPages={ this.props.search.totalPages }
            siblingRange="2"
            firstItem={ null }
            lastItem={ null }
          />
        </section>
      );
    }
    return <div />;
  }
}

const mapStateToProps = state => ( {
  search: state.search
} );

ResultsPagination.propTypes = {
  search: object,
  targetRequest: func
};

export default connect( mapStateToProps, actions )( ResultsPagination );
