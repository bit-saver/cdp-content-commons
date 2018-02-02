import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
//import './Search.css';
import * as actions from '../../actions';
import SearchAdvanced from './SearchAdvanced';


import { Form, Dropdown } from 'semantic-ui-react';
const contentTypes = [
  { key: 1, text: 'Article' },
  { key: 2, text: 'Audio' },
  { key: 3, text: 'Course' },
  { key: 4, text: 'Image' },
  { key: 5, text: 'Publication' },
  { key: 6, text: 'Quiz' },
  { key: 7, text: 'Video' }
];


class Search extends Component {
  constructor(props) {
    super(props);
    // toggles advanced search
    this.state = {
      open: false,
    };
    this.handleQueryOnChange = this.handleQueryOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdvancedSearchClick = this.handleAdvancedSearchClick.bind(this);
  }
  componentWillMount() {
    this.props.loadLanguages();
    this.props.loadPostTypes();
    this.props.loadSites();
  }
  handleQueryOnChange(e) {
    this.props.updateSearchQuery(e.target.value);
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.props.search.query) {
      return;
    }
    if (this.state.open) {
      // close advanced search when search runs
      this.setState({ open: false });
    }
    this.props.createRequest();
  }
  handleAdvancedSearchClick(e) {
    e.preventDefault();
    this.setState({
      open: !this.state.open,
    });
  }
  render() {
    return (    
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Dropdown         
              icon='chevron down' 
              text='Content Types' 
              selection
              options={contentTypes} 
              className='search_dropdown'
              onChange={this.handleChange}              
            />
            <Form.Input placeholder='Search...' onChange={this.handleQueryOnChange} />
            <Form.Button icon='search' type='submit' />
          </Form.Group>
        </Form>

        <div className="Search__component">        
          <div className="constrained__container">          
            <form onSubmit={this.handleSubmit}>
              <div className="Search__basic flex__container">
                <div className="Search__query__container">
                  <TextField
                    fullWidth={true}
                    floatingLabelText="Search"
                    onChange={this.handleQueryOnChange}
                  />
                </div>
                <div className="Search__query__submit">
                  <RaisedButton
                    type="submit"
                    className="Search__query_input"
                    label="Search"
                    primary={true}
                    fullWidth={true}
                  />
                </div>
              </div>
            </form>
            <div className="Search__toggle">
              <a href="#advanced-search" onClick={this.handleAdvancedSearchClick}>
                {this.state.open ? '← Basic Search' : 'Advanced Search'}
              </a>
            </div>
            {this.state.open && <SearchAdvanced />}
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search,
});

export default connect(mapStateToProps, actions)(Search);
