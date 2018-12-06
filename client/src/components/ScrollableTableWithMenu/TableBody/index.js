/**
 *
 * TableBody
 *
 */

import React from 'react';
import { Table, Checkbox, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './TableBody.css';

const TableBody = ( props ) => {
  const { data, tableHeaders, toggleProjectSelection, selectedProjects } = props;
  return (
    <Table.Body>
      { data.map( ( d,i ) => (
        <Table.Row key={ i }>
          { tableHeaders.map( ( header, i ) => {
            return (
              <Table.Cell key={ header } className="items_table_item">
                { i === 0 && (
                  <div className="primary_col">
                    <div className="primary_col_actions">
                      <Checkbox
                        data-label={ `${d.id}` }           
                        checked={ selectedProjects.get( `${d.id}` ) }
                        onChange={ toggleProjectSelection }
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
  );
}

TableBody.propTypes = {
  data: PropTypes.array,
  tableHeaders: PropTypes.array,
  toggleProjectSelection: PropTypes.func,
  selectedProjects: PropTypes.instanceOf(Map)
};

export default TableBody;
