import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { numberWithCommas } from '../../utils/helpers';
import { sortRequest } from '../../actions/search';
//import './Results.css';

class ResultsHeader extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange(event, index, value) {
    this.props.sortRequest(value);
  }
  render() {
    const { currentPage, total, sort } = this.props.search;

    if (this.props.search.response.took && this.props.search.response.hits.hits.length) {
      return (
        <div className="ResultsHeader__component">
          {currentPage === 1
            ? <p className="ResultsHeader__total">
                About {numberWithCommas(total)} results
              </p>
            : <p className="ResultsHeader__total">
                Page {currentPage} of about {total} results
              </p>}
          <form>
            <SelectField
              className="ResultsHeader__sort"
              value={sort}
              floatingLabelText="Sort By:"
              onChange={this.handleOnChange}
            >
              <MenuItem value="relevance" primaryText="Relevance" />
              <MenuItem value="published" primaryText="Recent" />
            </SelectField>
          </form>
        </div>
      );
    }

    return <div />;
  }
}

const mapStateToProps = state => ({
  search: state.search
});

export default connect(mapStateToProps, { sortRequest })(ResultsHeader);
