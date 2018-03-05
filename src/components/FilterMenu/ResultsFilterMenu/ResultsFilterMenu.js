import React, { Component } from 'react';
import FilterMenu from '../FilterMenu';
import FilterMenuItem from '../FilterMenuItem';

class ResultsFilterMenu extends Component {
  render() {
    return(
      <FilterMenu>
      	<FilterMenuItem menutitle='Most Recent' />
      	<FilterMenuItem menutitle='Video' />
      	<FilterMenuItem menutitle='Source' />
      	<FilterMenuItem menutitle='Language' />
      	<FilterMenuItem menutitle='Category' />
      </FilterMenu>
    );
  }
}

export default ResultsFilterMenu;