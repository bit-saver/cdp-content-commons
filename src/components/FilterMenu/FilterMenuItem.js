import React, { Component } from 'react';
import { Form, Icon } from 'semantic-ui-react';

class FilterMenuItem extends Component {  
  constructor(props) {
    super(props);  
    
    this.state = {
      value: '',
      filterItemOpen: false
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.displayFilter = this.displayFilter.bind(this);
    this.closeFilter = this.closeFilter.bind(this);
  };

  handleOnChange(e, { value }) {
    this.setState({ value });
  }

  displayFilter() {
    this.setState({ filterItemOpen: true }, () => {
      document.addEventListener('click', this.closeFilter);
    });
  }

  closeFilter(e) {
    if( !this.filterMenu.contains(e.target) ) {
      this.setState({ filterItemOpen: false }, () => {
        document.removeEventListener('click', this.closeFilter); 
      });
    }
  }

  render() {  	
    const { value } = this.state;

  	return(
  	  <div className="filterMenu" ref={ filterMenu => this.filterMenu = filterMenu }>
        <span 
          className={ this.state.filterItemOpen ? "filterMenu_label active" : "filterMenu_label" }
          onClick={ this.displayFilter }>
          { this.props.menuName } <Icon name="chevron up" />
        </span>
        <Form className={ this.state.filterItemOpen ? "filterMenu_options show" : "filterMenu_options" }>
          <Form.Group>          
          { !this.props.useCheckbox && this.props.menuOptions.map( (opt) => (            
            <Form.Radio 
              key={opt.optionValue}
              label={opt.optionLabel}
              value={opt.optionValue}
              checked={value === opt.optionValue}
              onChange={this.handleOnChange}
              onClick={this.props.handleFilterSelect}
            />  
          ) ) }
          { this.props.useCheckbox && this.props.menuOptions.map( (opt) => (            
            <Form.Checkbox
              key={opt.optionValue}
              label={opt.optionLabel}
              value={opt.optionValue}
              onChange={this.handleOnChange} 
              onClick={this.props.handleFilterSelect}
            />   
          ) ) }          
          </Form.Group>
        </Form>
      </div>
  	);
  }
}

export default FilterMenuItem;