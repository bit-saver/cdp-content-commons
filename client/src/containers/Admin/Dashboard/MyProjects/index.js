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
import './MyProjects.css';
import { tempData, menuItems } from './constants';
import ScrollableTableWithMenu from 'components/ScrollableTableWithMenu';

/* eslint-disable react/prefer-stateless-function */
class MyProjects extends React.Component {
  render() {
    const tableHeaders = ['name', 'status', 'notes'];

    return (
      <ScrollableTableWithMenu
        tableData={ tempData }
        columnMenu={ menuItems }
        persistentTableHeaders={ tableHeaders }
      />
    );
  }
}

MyProjects.propTypes = {
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  myprojects: makeSelectMyProjects()
} );

export default connect( mapStateToProps, actions )( MyProjects );
