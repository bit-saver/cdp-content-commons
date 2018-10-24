import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { numberWithCommas } from '../../utils/helpers';
import { Header } from 'semantic-ui-react';
import './SearchTerm.css';

const SearchTerm = ( props ) => {
  const { currentQuery, total } = props.search;

  return (
    <section className="searchTerm">
      <Header as="h1" className="searchTermQuery">
        { currentQuery && `${currentQuery}` }
        <Header.Subheader className="searchTermTotal">
          { numberWithCommas( total ) } { total === 1 ? 'item' : 'items' }
        </Header.Subheader>
      </Header>
    </section>
  );
};

const mapStateToProps = state => ( {
  search: state.search
} );

SearchTerm.propTypes = {
  search: object
};

export default connect( mapStateToProps )( SearchTerm );
