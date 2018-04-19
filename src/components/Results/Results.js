import React, { Component } from 'react';
import { shape, array, number } from 'prop-types';
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

    /* TEMP data for Article Display */
    const articleData = items[0] ? Object.assign( {}, normalizeItem( items[0] ) ) : null;
    if ( articleData ) articleData.type = 'article';
    /* END TEMP */

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
              { /* TEMP ARTICLE ITEM */ }
              { articleData &&
                <Grid.Column
                  mobile={ 16 }
                  tablet={ view === 'gallery' ? 8 : 16 }
                  computer={ view === 'gallery' ? 4 : 16 }
                  className={
                    view === 'gallery' ? 'card_wrapper card_wrapper--gallery' : 'card_wrapper card_wrapper--list'
                  }
                  key={ articleData.id }
                >
                  <ResultItem key={ articleData.id } item={ articleData } />
                </Grid.Column>
              }
              { /* END TEMP ARTICLE ITEM */ }

              { items.length > 0 && items.map( item => (
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
  search: state.search
} );

Results.propTypes = {
  search: shape( {
    response: shape( {
      hits: shape( {
        hits: array
      } )
    } ),
    currentPage: number
  } )
};

export default connect( mapStateToProps )( Results );
