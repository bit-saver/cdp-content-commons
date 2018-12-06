/**
 *
 * TableHeader
 *
 */

import React from 'react';
import upperFirst from 'lodash/upperFirst';
import { Table, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './TableHeader.css';

const TableHeader = props => {
  const { tableHeaders, column, direction, handleSort, toggleAllCheckboxSelection } = props;
  return (
    <Table.Header>
      <Table.Row>
        { tableHeaders.map( (header,i) => (
          <Table.HeaderCell 
            key={ i }
            sorted={ column === header ? direction : null }
            onClick={ handleSort( header )  }
          >
            { i === 0 
              ? <Checkbox label={ upperFirst(header) } onChange={ toggleAllCheckboxSelection }/>
              : upperFirst(header)
            }
          </Table.HeaderCell>
        ) ) }
      </Table.Row>
    </Table.Header>
  );
}

TableHeader.propTypes = {
  tableHeaders: PropTypes.array,
  column: PropTypes.string,
  direction: PropTypes.string,
  handleSort: PropTypes.func, 
  toggleAllCheckboxSelection: PropTypes.func 
};

export default TableHeader;
