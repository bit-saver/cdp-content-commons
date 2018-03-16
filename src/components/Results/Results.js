import React from 'react';
import { shape, array, number } from 'prop-types';
import { connect } from 'react-redux';
import ResultsHeader from './ResultsHeader';
import ResultItem from './ResultItem';
import ResultsPagination from './ResultsPagination';
import { Grid } from 'semantic-ui-react';
import './Results.css';

const Results = ( props ) => {
  let items;
  if ( props.search.response.hits ) {
    items = props.search.response.hits.hits;
  } else {
    items = [];
  }

  let isNoResults;
  if ( !items.length && Object.keys( props.search.response ).length ) {
    isNoResults = true;
  }

  return (
    <section className="results">
      { props.search.currentPage !== -1 && (
        <div>
          <section>
            <ResultsHeader />
          </section>
          <Grid className="results_wrapper">
            { items.map( item => (
              <Grid.Column mobile={ 16 } tablet={ 8 } computer={ 4 } className="card_wrapper" key={ item._id }>
                <ResultItem key={ item._id } item={ item } />
              </Grid.Column>
            ) ) }

            { isNoResults && (
              <div className="Results__no__results">Sorry, your search did not return any results =(</div>
            ) }
          </Grid>
          <section>
            <ResultsPagination />
          </section>
        </div>
      ) }
    </section>
  );
};

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