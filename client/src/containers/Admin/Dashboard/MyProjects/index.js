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
import ScrollableTableWithMenu from 'components/ScrollableTableWithMenu';

import { tempData, menuItems } from './constants';

/* eslint-disable react/prefer-stateless-function */
class MyProjects extends React.Component {
  render() {
    const tableHeaders = ['name', 'status', 'notes'];

    return (
      <ScrollableTableWithMenu
        tableData={ tempData }
        columnMenu={ menuItems }
        persistentTableHeaders={ ['name', 'status', 'notes'] }
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
