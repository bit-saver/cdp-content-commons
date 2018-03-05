import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

class FilterMenuItem extends Component {  

  render() {
  	const options = [
  	  { key: 'item1', text: 'item 1', value: 'item 1' },
  	  { key: 'item2', text: 'item 2', value: 'item 2' },
  	  { key: 'item3', text: 'item 3', value: 'item 3' }
  	];

  	return(
  	  <div className='filterMenuItem'>
  	  	<Dropdown 
  	  	  placeholder={this.props.menutitle}
  	  	  options={options}          
  	  	/>
  	  </div>  	  
  	);
  }
}

export default FilterMenuItem;