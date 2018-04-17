import React from 'react';
import { func, string, bool } from 'prop-types';
import { Label, Icon } from 'semantic-ui-react';

const FilterSelectionItem = ( props ) => {
  const handleOnClick = () => {
    props.onClick( {
      value: props.value,
      filter: props.filter,
      labelclean: props.label,
      checked: false
    } );
  };

  return (
    <Label key={ props.value } data-label={ props.value }>
      { props.label }
      { !props.single && <Icon name="delete" filter={ props.filter } onClick={ handleOnClick } /> }
    </Label>
  );
};

FilterSelectionItem.propTypes = {
  value: string,
  label: string,
  filter: string,
  single: bool,
  onClick: func
};

export default FilterSelectionItem;
