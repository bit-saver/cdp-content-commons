/**
 *
 * MyProjectPrimaryCol
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'semantic-ui-react';
import './MyProjectPrimaryCol.css';

const MyProjectPrimaryCol = ( props ) => {
  return (
    <Fragment>
      <div className="myProjects_actions">
        <Checkbox                           
          data-label={ `${props.d.id}` }
          checked={ props.selectedItems.get( `${props.d.id}` ) }
          onChange={ props.toggleItemSelection }
        />
        {/* <div className="myProjects_favorite"><Icon name='star' /></div> */}
      </div>
      <div className="myProjects_thumbnail">
        <img src={ `${props.d.thumbnail}` } />
      </div>
      <div className="myProjects_data">
        <h3 className="myProjects_data_title">{ props.d[props.header.name] }</h3>
        <div className="myProjects_data_actions">
          <a href="#">Details</a>
          <span>&nbsp;|&nbsp;</span>
          <a href="#">Preview</a>
          <span>&nbsp;|&nbsp;</span>
          <a href="#">Share</a>
        </div>
      </div>
    </Fragment>
  );
}

MyProjectPrimaryCol.propTypes = {};

export default MyProjectPrimaryCol;
