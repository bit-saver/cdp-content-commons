/**
 *
 * ScrollableTableWithMenu
 *
 */
import React from 'react';
// import PropTypes from 'prop-types';
import './ScrollableTableWithMenu.css';
import { Table, Grid, Checkbox, Icon, Label } from 'semantic-ui-react';

import lowerFirst from 'lodash/lowerFirst';
import upperFirst from 'lodash/upperFirst';
import sortBy from 'lodash/sortBy';

/* eslint-disable react/prefer-stateless-function */
class ScrollableTableWithMenu extends React.Component {
  state = {
    data: this.props.tableData,
    tableHeaders: this.props.persistentTableHeaders,
    displayTableMenu: false,    
    selectAllProjects: false,
    selectedProjects: new Map(),
    column: null,
    direction: null
  };

  toggleTableMenu = () => {
    this.setState( prevState => ({ displayTableMenu: !prevState.displayTableMenu }) );
  }

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
      if ( !newSelectAllProjectsState ) {
        newSelectedProjects.set(project, false);
      } else {
        newSelectedProjects.set(project, true);
      }      
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
      displayTableMenu,
      tableHeaders,
      selectedProjects,
      column,
      data,
      direction,
    } = this.state;

    const { columnMenu } = this.props;

    return (
      <Grid>
        {/* TABLE PROJECTS DISPLAY / DROPDOWN MENU */}
        <Grid.Row>
          <Grid.Column floated='left' width={ 8 }>
            <div>Show: 25 &#9660; | 1-25 of 137 for 'search term'</div>
          </Grid.Column>
          <Grid.Column floated='right' width={ 8 }>
            <div className='myProjects_menu'>
              <span onClick={ this.toggleTableMenu }>See More &#9660;</span>
              <div className={ displayTableMenu ? 'myProjects_menu_list display' : 'myProjects_menu_list' }>
                { columnMenu.map( item => (
                  <Checkbox key={ item } onChange={ this.tableMenuOnChange } label={ item } />
                ) ) }
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>        
        
        {/* TABLE */}
        <Grid.Row>
          <Grid.Column>
            <div className="myProjects_table">
              <Table sortable celled>
                <Table.Header>
                  <Table.Row>
                    { tableHeaders.map( (header,i) => (
                      <Table.HeaderCell 
                        key={ i }
                        className="myProjects_table_headerCell"
                        sorted={ column === header ? direction : null }
                        onClick={ this.handleSort( header )  }
                      >
                        { i === 0 
                          ? <Checkbox label={ upperFirst(header) } onChange={ this.toggleAllCheckboxSelection }/>
                          : upperFirst(header)
                        }
                      </Table.HeaderCell>
                    ) ) }
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  { data.map( ( d,i ) => (
                    <Table.Row key={ i }>
                      { tableHeaders.map( ( header, i ) => {
                        return (
                          <Table.Cell key={ header } className="project_item">
                            { i === 0 && (
                              <div className="primary_col">
                                <div className="primary_col_actions">
                                  <Checkbox
                                    data-label={ `${d.id}` }           
                                    checked={ selectedProjects.get( `${d.id}` ) }
                                    onChange={ this.toggleProjectSelection }
                                  />
                                  <div><Icon name='star' /></div>                                  
                                </div>
                                <div className="primary_col_data">
                                  <p>{ d[header] }</p>
                                </div>
                              </div>
                            ) }
                            { i !== 0 && d[header] }
                          </Table.Cell>
                        )
                      } ) }
                    </Table.Row>
                  ) ) }
                </Table.Body>
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
