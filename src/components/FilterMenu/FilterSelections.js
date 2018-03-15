import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import './FilterSelections.css';

const FilterSelections = ( props ) => {
  const { selections } = props;
  return (
    <div className="filterMenu_selections">
      { selections.length > 0 &&
        selections.map( selection => (
          <Label key={ selection.selectionValue } data-label={ selection.selectionValue }>
            { selection.selectionLabel }
            <Icon name="delete" onClick={ props.onremove } />
          </Label>
        ) )
      }
    </div>
  );
}

export default FilterSelections;
