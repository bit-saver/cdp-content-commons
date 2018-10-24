import React, { Component } from 'react';
import { shape, array, number, func } from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
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
  }

  componentDidMount() {
    if ( !this.props.search.response.hits ) {
      // No current search and no saved session results so execute default search
      this.props.createRequest();
    }
  }

  shouldComponentUpdate( nextProps, nextState ) {
    return this.props.search.response.hits !== nextProps.search.response.hits || this.state.view !== nextState.view;
  }

  toggleView = ( e ) => {
    const { view } = e.target.dataset;
    this.setState( { view } );
  };

  render() {
    const { view } = this.state;
    const { hits } = this.props.search.response;
    const items = hits ? hits.hits : [];
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
              { !items.length && (
                <div className="results_noResults">
                  <div className="results_help">
                    <i>{ `Sorry, no matches found for "${this.props.search.currentQuery}"` }</i>
                    <p>
                      We are working to enhance the search functionality of Content Commons. If you continue to
                      experience issues with your search results or are having trouble with a particular search term,
                      let us know!
                    </p>
                    <p>
                      We will continue collecting analytics on what terms and phrases folks are searching in order to
                      provide you a seamless search experience.
                    </p>
                    <div className="results_help--suggestions">
                      <h3>Search suggestions</h3>
                      <p>Check for spelling mistakes</p>
                      <p>Broaden your search by using fewer or more general words</p>
                      <p>Try different words that mean the same thing in the search box above</p>
                    </div>
                  </div>
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
  createRequest: func,
  search: shape( {
    response: shape( {
      hits: shape( {
        hits: array
      } )
    } ),
    currentPage: number
  } )
};

export default connect( mapStateToProps, actions )( Results );
