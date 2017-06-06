import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment';

const DateTimeFormat = global.Intl.DateTimeFormat;

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
  handleOnSubmit(e) {
    e.preventDefault();
  }
  handleDateSelect(event, index, value) {
    this.props.dateUpdate(value);
  }
  handleFromDateChange(event, date) {
    this.props.fromDateUpdate(moment(date).format('DD/MM/YYYY'));
  }
  handleToDateChange(event, date) {
    this.props.toDateUpdate(moment(date).format('DD/MM/YYYY'));
  }
  render() {
    return (
      <form className="SearchAdvanced__component" onSubmit={this.handleOnSubmit}>
        <div className="SearchAdvanced__row">
          {/* Language selector*/}
          <SelectField
            value={this.props.language.currentLanguage}
            floatingLabelText="Language"
            onChange={this.handleLanguageChange}
          >
            {this.props.language.list.map(item => (
              <MenuItem key={item.key} value={item.key} primaryText={item.display} />
            ))}
          </SelectField>

          {/* Format selector*/}
          <div className="SearchAdvanced__format">
            <SelectField
              value={this.props.type.currentPostType}
              floatingLabelText="Format"
              onChange={this.handlePostTypeUpdate}
              floatingLabelFixed={true}
            >
              <MenuItem value="" primaryText="All Formats" />
              {this.props.type.list.map(item => (
                <MenuItem key={item.key} value={item.key} primaryText={item.display} />
              ))}
            </SelectField>
          </div>

          {/* Author input*/}
          <TextField
            floatingLabelText="Author"
            onChange={this.handleAuthorChange}
            value={this.props.search.author}
          />
        </div>

        <div className="SearchAdvanced__row">
          <SelectField
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
            formatDate={new DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }).format}
          />

          <DatePicker
            value={new Date(this.props.date.to)}
            autoOk={false}
            floatingLabelText="To Date"
            disableYearSelection={false}
            container="inline"
            mode="portrait"
            minDate={new Date(process.env.REACT_APP_MIN_DATE)}
            maxDate={new Date()}
            onChange={this.handleToDateChange}
            disabled={this.props.date.dateSelect !== 'custom' ? true : false}
            formatDate={new DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }).format}
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
  date: state.date
});

export default connect(mapStateToProps, actions)(SearchAdvanced);
