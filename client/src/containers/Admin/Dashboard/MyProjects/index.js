/**
 *
 * MyProjects
 *
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectMyProjects from './selectors';
import { Table, Grid, Checkbox } from 'semantic-ui-react';
import './MyProjects.css';

import lowerFirst from 'lodash/lowerFirst';
import upperFirst from 'lodash/upperFirst';
import { tempData, menuItems } from './constants';

/* eslint-disable react/prefer-stateless-function */
class MyProjects extends React.Component {
  state = {
    displayTableMenu: false,
    tableHeaders: ['name', 'status', 'notes'],
    selectAllProjects: false,
    selectedProjects: new Map()
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

  toggleAllCheckboxSelection = () => {    
    const allProjects = Array
      .from( document.querySelectorAll('[data-label]') )
      .map( project => project.dataset.label );

    const newSelectAllProjectsState = !this.state.selectAllProjects;
    let newSelectedProjects = new Map();        
    
    allProjects.map( project => {
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

  render() {
    const { displayTableMenu, tableHeaders, selectAllProjects, selectedProjects } = this.state;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column floated='left' width={ 8 }>
            <div>Show: 25 &#9660; | 1-25 of 137 for 'search term'</div>
          </Grid.Column>
          <Grid.Column floated='right' width={ 8 }>
            <div className='myProjects_menu'>
              <span onClick={ this.toggleTableMenu }>See More &#9660;</span>
              <div className={ displayTableMenu ? 'myProjects_menu_list display' : 'myProjects_menu_list' }>
                { menuItems.map( item => (
                  <Checkbox key={ item } onChange={ this.tableMenuOnChange } label={ item } />
                ) ) }
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>        
        <Grid.Row>          
          <Grid.Column>
            <div className='myProjects_table'>
              <Table>
                <Table.Header>
                  <Table.Row>
                    { tableHeaders.map( (header,i) => (
                      <Table.HeaderCell key={i}>
                        { i === 0 
                          ? <Checkbox label={ upperFirst(header) } onClick={ this.toggleAllCheckboxSelection }/>
                          : upperFirst(header)
                        }
                      </Table.HeaderCell>
                    ) ) }
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  { tempData.map( (d,i) => (
                    <Table.Row key={`${d.name}_${i}`}>
                      { tableHeaders.map( header => {
                        return (
                          <Table.Cell key={header}>
                            { header === 'name' 
                              ? <Checkbox
                                  data-label={ `name_${d.name}_${i}` }
                                  label={ d[header] }
                                  checked={ selectedProjects.get(`name_${d.name}_${i}`) }
                                  onChange={ this.toggleProjectSelection }
                                /> 
                              : d[header]
                            }
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

MyProjects.propTypes = {
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  myprojects: makeSelectMyProjects()
} );

export default connect( mapStateToProps, actions )( MyProjects );
