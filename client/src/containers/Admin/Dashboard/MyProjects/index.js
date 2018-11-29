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
import { tempData } from './constants';

/* eslint-disable react/prefer-stateless-function */
class MyProjects extends React.PureComponent {
  state = {
    displayTableMenu: false,
    tableHeaders: ['name', 'status', 'notes']
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

  render() {
    const { displayTableMenu, tableHeaders } = this.state;

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
                <Checkbox onChange={ this.tableMenuOnChange } label='Analytics' />
                <Checkbox onChange={ this.tableMenuOnChange } label='Author' />
                <Checkbox onChange={ this.tableMenuOnChange } label='Categories' />
                <Checkbox onChange={ this.tableMenuOnChange } label='Date' />
                <Checkbox onChange={ this.tableMenuOnChange } label='Owner' />
                <Checkbox onChange={ this.tableMenuOnChange } label='Source' />
                <Checkbox onChange={ this.tableMenuOnChange } label='Visibility' />
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
                    { tableHeaders.map( header => (<Table.HeaderCell>{ upperFirst(header) }</Table.HeaderCell>) ) }
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  { tempData.map( d => (
                    <Table.Row>
                      { tableHeaders.map( header => {
                        return <Table.Cell>{ d[header] }</Table.Cell>
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
