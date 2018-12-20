import React, { Component } from 'react';
// import { object, func } from 'prop-types';
// import { connect } from 'react-redux';
// import * as actions from '../../../actions/search';
import './TablePagination.css';

import { Pagination } from 'semantic-ui-react';

class TablePagination extends Component {
  constructor( props ) {
    super( props );
    this.dashSearch = {
      currentPage: 1,
      totalPages: 20
    };
  }

  // handlePaginationChange = ( e, { activePage } ) => this.props.targetRequest( activePage );
  handlePaginationChange = () => null;

  render() {
    if ( this.dashSearch.totalPages > 1 ) {
      const nextDisabled = this.dashSearch.currentPage === this.dashSearch.totalPages;
      const prevDisabled = this.dashSearch.currentPage === 1;
      return (
        <section className="TablePagination">
          <Pagination
            nextItem={ { content: 'Next ⟩', disabled: nextDisabled } }
            prevItem={ { content: '⟨ Previous', disabled: prevDisabled } }
            activePage={ this.dashSearch.currentPage < 0 ? 1 : this.dashSearch.currentPage }
            onPageChange={ this.handlePaginationChange }
            totalPages={ this.dashSearch.totalPages }
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

// const mapStateToProps = state => ( {
//   dashSearch: state.dashSearch
// } );

// TablePagination.propTypes = {
//   dashSearch: object
//   targetRequest: func
// };

// export default connect( mapStateToProps, actions )( TablePagination );
export default TablePagination;
