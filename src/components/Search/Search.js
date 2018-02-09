import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Form, Dropdown } from 'semantic-ui-react';

/****
TEMP
*****/
const contentTypes = [
  { key: 0, text: 'All Content Types', value: 'All Content Types' },
  { key: 1, text: 'Article', value: 'Article' },
  { key: 2, text: 'Audio', value: 'Audio' },
  { key: 3, text: 'Course', value: 'Course' },
  { key: 4, text: 'Image', value: 'Image' },
  { key: 5, text: 'Publication', value: 'Publication' },
  { key: 6, text: 'Quiz', value: 'Quiz' },
  { key: 7, text: 'Video', value: 'Video' }
];
/*****/

class Search extends Component {
  constructor(props) {
    super(props);
    // toggles advanced search
    this.state = {
      open: false,
      contentType: 'Content Types',      
    };
    this.handleQueryOnChange = this.handleQueryOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdvancedSearchClick = this.handleAdvancedSearchClick.bind(this);
    this.handleSearchDropdownSelection = this.handleSearchDropdownSelection.bind(this);
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

  handleSearchDropdownSelection(e, { value }) {
    this.setState({ contentType: value });
  }

  render() {
    const contentType = this.state.contentType;
    
    return (    
      <section>
        <div className='search_bar'>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Dropdown         
                icon='chevron down'                 
                selection
                options={contentTypes} 
                className='search_dropdown'               
                text={contentType}
                onChange={this.handleSearchDropdownSelection}
              />
              <Form.Input 
                placeholder='Search...' 
                className='search_input'
                onChange={this.handleQueryOnChange} 
              />
              <Form.Button icon='search' type='submit' />
            </Form.Group>
          </Form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search,
});

export default connect(mapStateToProps, actions)(Search);
