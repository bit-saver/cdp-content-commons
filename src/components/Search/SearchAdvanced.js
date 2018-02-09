import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
/*import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';*/
import moment from 'moment';

class SearchAdvanced extends Component {
  constructor(props) {
    super(props);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handlePostTypeUpdate = this.handlePostTypeUpdate.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.handleFromDateChange = this.handleFromDateChange.bind(this);
    this.handleToDateChange = this.handleToDateChange.bind(this);
    this.handleSiteUpdate = this.handleSiteUpdate.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
  }
  handlePostTypeUpdate(event, index, value) {
    this.props.postTypeUpdate(value);
  }
  handleLanguageChange(event, index, value) {
    this.props.languageUpdate(value);
  }
  handleAuthorChange(e) {
    this.props.updateSearchAuthor(e.target.value);
  }
  handleTagChange(e) {
    this.props.updateSearchTag(e.target.value);
  }
  handleOnSubmit(e) {
    e.preventDefault();
  }
  handleDateSelect(event, index, value) {
    this.props.dateUpdate(value);
  }
  handleFromDateChange(event, date) {
    this.props.fromDateUpdate(moment(date).format('MM/DD/YYYY'));
  }
  handleToDateChange(event, date) {
    this.props.toDateUpdate(moment(date).format('MM/DD/YYYY'));
  }
  handleSiteUpdate(event, index, value) {
    this.props.siteUpdate(value);
  }
  render() {
    return (
      <form className="SearchAdvanced__component" onSubmit={this.handleOnSubmit}>
        <div className="SearchAdvanced__row">
          {/* Language selector*/}
          <SelectField
            className="SearchAdvanced__filter"
            value={this.props.language.currentLanguage}
            floatingLabelText="Language"
            onChange={this.handleLanguageChange}
          >
            {this.props.language.list.map(item =>
              <MenuItem key={item.key} value={item.key} primaryText={item.display} />
            )}
          </SelectField>

          {/* Site input */}
          <div className="SearchAdvanced__site">
            <SelectField
              className="SearchAdvanced__filter"
              value={this.props.site.currentSite}
              floatingLabelText="Site"
              onChange={this.handleSiteUpdate}
              floatingLabelFixed={true}
            >
              <MenuItem value="" primaryText="All Sites" />
              {this.props.site.list.map(item =>
                <MenuItem key={item.key} value={item.key} primaryText={item.display} />
              )}
            </SelectField>
          </div>

          {/* Format or Post Type input*/}
          <div className="SearchAdvanced__format">
            <SelectField
              className="SearchAdvanced__filter"
              value={this.props.type.currentPostType}
              floatingLabelText="Format"
              onChange={this.handlePostTypeUpdate}
              floatingLabelFixed={true}
            >
              <MenuItem value="" primaryText="All Formats" />
              {this.props.type.list.map(item =>
                <MenuItem key={item.key} value={item.key} primaryText={item.display} />
              )}
            </SelectField>
          </div>

          {/* Author input*/}
          <TextField
            className="SearchAdvanced__filter"
            floatingLabelText="Author"
            onChange={this.handleAuthorChange}
            value={this.props.search.author}
          />
        </div>

        <div className="SearchAdvanced__row">
          {/* Tags input*/}
          <TextField
            className="SearchAdvanced__filter"
            floatingLabelText="Tag"
            onChange={this.handleTagChange}
            value={this.props.search.tag}
          />

          <SelectField
            className="SearchAdvanced__filter"
            value={this.props.date.dateSelect}
            floatingLabelText="Date"
            onChange={this.handleDateSelect}
            floatingLabelFixed={true}
          >
            <MenuItem value={this.props.date.options[0]} primaryText="Any time" />
            <MenuItem value={this.props.date.options[1]} primaryText="Past 24 hours" />
            <MenuItem value={this.props.date.options[2]} primaryText="Past week" />
            <MenuItem value={this.props.date.options[3]} primaryText="Past month" />
            <MenuItem value={this.props.date.options[4]} primaryText="Past year" />
            <MenuItem value={this.props.date.options[5]} primaryText="Custom range" />
          </SelectField>

          <DatePicker
            className="SearchAdvanced__filter"
            value={new Date(this.props.date.from)}
            autoOk={false}
            floatingLabelText="From Date"
            disableYearSelection={false}
            container="inline"
            mode="portrait"
            onChange={this.handleFromDateChange}
            minDate={new Date(process.env.REACT_APP_MIN_DATE)}
            maxDate={new Date()}
            disabled={this.props.date.dateSelect !== 'custom' ? true : false}
            locale="en-US"
          />

          <DatePicker
            className="SearchAdvanced__filter"
            value={new Date(this.props.date.to)}
            autoOk={false}
            floatingLabelText="To Date"
            disableYearSelection={false}
            container="inline"
            mode="portrait"
            onChange={this.handleToDateChange}
            minDate={new Date(process.env.REACT_APP_MIN_DATE)}
            maxDate={new Date()}
            disabled={this.props.date.dateSelect !== 'custom' ? true : false}
            locale="en-US"
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search,
  language: state.language,
  type: state.type,
  date: state.date,
  site: state.site
});

export default connect(mapStateToProps, actions)(SearchAdvanced);
