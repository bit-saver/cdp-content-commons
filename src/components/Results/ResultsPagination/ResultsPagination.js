import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../actions/search';
import './ResultsPagination.css';

import { Pagination } from 'semantic-ui-react';

class ResultsPagination extends Component {
  handlePaginationChange = ( e, { activePage } ) => this.props.targetRequest( activePage );

  render() {
    return (
      <Pagination
        className="resultsPagination"
        activePage={ this.props.search.currentPage }
        onPageChange={ this.handlePaginationChange }
        totalPages={ this.props.search.totalPages }
      />
    );
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
