/**
 *
 * ScrollableTableWithMenu
 *
 */
import React from 'react';
// import PropTypes from 'prop-types';
import './ScrollableTableWithMenu.css';
import { Table, Grid } from 'semantic-ui-react';

import TableItemsDisplay from './TableItemsDisplay';
import TableMenu from './TableMenu';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

import lowerFirst from 'lodash/lowerFirst';
import sortBy from 'lodash/sortBy';

/* eslint-disable react/prefer-stateless-function */
class ScrollableTableWithMenu extends React.Component {
  state = {
    data: this.props.tableData,
    tableHeaders: this.props.persistentTableHeaders,        
    selectAllProjects: false,
    selectedProjects: new Map(),
    column: null,
    direction: null
  };

  tableMenuOnChange = ( e ) => {    
    e.persist();
    const menuItem = lowerFirst(e.target.textContent);
    this.setState(prevState => {
      if ( prevState.tableHeaders.includes(menuItem) ) {
        return { tableHeaders: prevState.tableHeaders.filter( header => header !== menuItem ) };
      } else {
        return { tableHeaders: [...prevState.tableHeaders, menuItem] };
      }
    });
  }

  toggleAllCheckboxSelection = e => {
    e.stopPropagation();
    const allProjects = Array
      .from( document.querySelectorAll('[data-label]') )
      .map( project => project.dataset.label );

    const newSelectAllProjectsState = !this.state.selectAllProjects;
    let newSelectedProjects = new Map();        
    
    allProjects.forEach( project => {
      !newSelectAllProjectsState
      ? newSelectedProjects.set(project, false)
      : newSelectedProjects.set(project, true)  
    } );
    
    this.setState({
      selectAllProjects: newSelectAllProjectsState,
      selectedProjects: newSelectedProjects
    });
  }

  toggleProjectSelection = (e, data) => {
    const isChecked = data.checked;
    this.setState( prevState => ( {
      selectedProjects: prevState.selectedProjects.set(data['data-label'], isChecked)
    } ) );
  }

  handleSort = clickedColumn => () => {    
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      return this.setState({
        column: clickedColumn,
        data: sortBy(data, [clickedColumn]),
        direction: 'ascending',
      });
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  }

  render() {
    const {
      tableHeaders,
      selectedProjects,
      column,
      data,
      direction,
    } = this.state;

    const { columnMenu } = this.props;

    return (
      <Grid>
        <Grid.Row>
          <TableItemsDisplay />
          <TableMenu columnMenu={ columnMenu } tableMenuOnChange={ this.tableMenuOnChange } />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div className="items_table">
              <Table sortable celled>
                <TableHeader
                  tableHeaders={ tableHeaders }
                  column={ column }
                  direction={ direction }
                  handleSort={ this.handleSort }
                  toggleAllCheckboxSelection={ this.toggleAllCheckboxSelection }
                />
                <TableBody
                  data={ data }
                  tableHeaders={ tableHeaders }
                  selectedProjects={ selectedProjects }
                  toggleProjectSelection={ this.toggleProjectSelection }
                />
              </Table>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

ScrollableTableWithMenu.propTypes = {
};

export default ScrollableTableWithMenu;
