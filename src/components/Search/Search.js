import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Form } from 'semantic-ui-react';

class Search extends Component {
  constructor(props) {
    super(props);
    // toggles advanced search
    this.state = {
      open: false
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
      <section>
        <div className='search_bar'>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
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
