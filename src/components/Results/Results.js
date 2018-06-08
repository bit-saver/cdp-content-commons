import React, { Component } from 'react';
import { shape, array, number, object } from 'prop-types';
import { connect } from 'react-redux';
import SearchTerm from '../SearchTerm';
import Breadcrumbs from '../Breadcrumbs';
import FilterMenu from '../FilterMenu/FilterMenu';
import ResultsHeader from './ResultsHeader';
import ResultItem from './ResultItem';
import ResultsPagination from './ResultsPagination';
import { Grid } from 'semantic-ui-react';
import { normalizeItem } from '../../utils/parser';
import './Results.css';

class Results extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      view: 'gallery'
    };

    this.toggleView = this.toggleView.bind( this );
  }

  shouldComponentUpdate( nextProps, nextState ) {
    return ( this.props.search.response.hits !== nextProps.search.response.hits || this.state.view !== nextState.view );
  }

  toggleView( e ) {
    const { view } = e.target.dataset;
    this.setState( { view } );
  }

  render() {
    const { view } = this.state;

    let items;

    if ( this.props.search.response.hits ) {
      items = this.props.search.response.hits.hits;
    } else {
      items = [];
    }

    let isNoResults;
    if ( !items.length && Object.keys( this.props.search.response ).length ) {
      isNoResults = true;
    }

    sessionStorage.setItem( 'currentState', JSON.stringify( this.props.state ) );

    return (
      <section className="results">
        <Breadcrumbs />
        { this.props.search.currentPage !== -1 && (
          <div>
            <SearchTerm />
            <FilterMenu />
            <section>
              <ResultsHeader toggleView={ this.toggleView } currentView={ this.state.view } />
            </section>
            <Grid className="results_wrapper">
              { items.map( item => (
                <Grid.Column
                  mobile={ 16 }
                  tablet={ view === 'gallery' ? 8 : 16 }
                  computer={ view === 'gallery' ? 4 : 16 }
                  className={
                    view === 'gallery' ? 'card_wrapper card_wrapper--gallery' : 'card_wrapper card_wrapper--list'
                  }
                  key={ item._id }
                >
                  <ResultItem key={ item._id } item={ normalizeItem( item ) } />
                </Grid.Column>
              ) ) }
              { isNoResults && (
                <div className="results_noResults">
                  <p>Sorry, your search did not return any results =(</p>
                </div>
              ) }
            </Grid>
            <ResultsPagination />
          </div>
        ) }
      </section>
    );
  }
}

const mapStateToProps = state => ( {
  search: state.search,
  state
} );

Results.propTypes = {
  search: shape( {
    response: shape( {
      hits: shape( {
        hits: array
      } )
    } ),
    currentPage: number
  } ),
  state: object
};

export default connect( mapStateToProps )( Results );
