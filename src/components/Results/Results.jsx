import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResultsHeader from './ResultsHeader';
import ResultItem from './ResultItem';
import ResultsPagination from './ResultsPagination';
// import * as actions from '../../actions/search';

class Results extends Component {
  render() {
    console.log(this.props.search);
    let items;
    if (this.props.search.response.hits) {
      items = this.props.search.response.hits.hits;
    } else {
      items = [];
    }

    return (
      <div className="Results__component">
        {this.props.search.currentPage !== -1 &&
          <div className="Results__component constrained__container">
            <section>
              <ResultsHeader />
            </section>
            <section className="Results__container">
              {items.map(item => <ResultItem key={item._id} item={item} />)}
            </section>
            <section>
              <ResultsPagination />
            </section>
          </div>}
          {!items.length && Object.keys(this.props.search.response).length ? (
            <div className="Results__no__results">
              Sorry, your search did not return any results =(
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search
});

export default connect(mapStateToProps)(Results);
