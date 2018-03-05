import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions/search';

class ResultsPagination extends Component {
  constructor( props ) {
    super( props );
    this.handleOnNextClick = this.handleOnNextClick.bind( this );
    this.handleOnPreviousClick = this.handleOnPreviousClick.bind( this );
    this.handlePageClick = this.handlePageClick.bind( this );
  }
  handleOnPreviousClick( event ) {
    if ( this.props.search.currentPage <= 1 ) {
      return;
    }

    event.preventDefault();
    this.props.previousRequest();
  }
  handleOnNextClick( event ) {
    if ( this.props.search.currentPage >= this.props.search.totalPages ) {
      return;
    }

    event.preventDefault();
    this.props.nextRequest();
  }
  handlePageClick( event ) {
    event.preventDefault();
    if ( parseInt( event.target.text, 10 ) > this.props.search.totalPages ) {
      return;
    }

    this.props.targetRequest( parseInt( event.target.text, 10 ) );
  }
  render() {
    const o = this.props.search;
    if ( o.response.took && o.response.hits.hits.length ) {
      return (
        <ul className="ResultsPagination__component">
          <li className="ResultsPagination__previous">
            <a
              href="#previous"
              className={
                o.currentPage <= 1
                  ? 'ResultsPagination__previous ResultsPagination__disabled'
                  : 'ResultsPagination__previous'
              }
              onClick={ this.handleOnPreviousClick }
            >
              Previous
            </a>
          </li>
          { o.pages.map( ( page ) => {
            if ( page === o.currentPage ) {
              return (
                <li key={ page } className="ResultsPagination__active">
                  { page }
                </li>
              );
            }
            return (
              <li className="ResultPagination__target" key={ page }>
                <a
                  href="#page"
                  className={
                    page > o.totalPages
                      ? 'ResultPagination__target ResultsPagination__disabled'
                      : 'ResultPagination__target'
                  }
                  onClick={ this.handlePageClick }
                >
                  { page }
                </a>
              </li>
            );
          } ) }
          <li
            className={
              o.currentPage >= o.totalPages
                ? 'ResultsPagination__next ResultsPagination__disabled'
                : 'ResultsPagination__next'
            }
          >
            <a href="#next" onClick={ this.handleOnNextClick }>
              Next
            </a>
          </li>
        </ul>
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
  previousRequest: func,
  nextRequest: func,
  targetRequest: func
};

export default connect( mapStateToProps, actions )( ResultsPagination );
