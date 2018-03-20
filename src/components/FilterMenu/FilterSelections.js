import React, { Component } from 'react';
import { func, array } from 'prop-types';
import { Label, Icon } from 'semantic-ui-react';
import './FilterSelections.css';

class FilterSelections extends Component {
  componentWillReceiveProps( nextProps ) {
    if ( nextProps.selections.length < 1 ) {
      this.selectionsDisplay.classList.remove( 'display' );
    } else {
      this.selectionsDisplay.classList.add( 'display' );
    }
  }

  render() {
    const { selections, onRemove, removeAll } = this.props;
    return (
      <div className="filterMenu_selections" ref={ ( node ) => { this.selectionsDisplay = node; } }>
        { selections.length > 0 &&
          selections.map( selection => (
            <Label
              key={ selection.selectionValue }
              data-label={ selection.selectionValue }
              data-parent={ selection.hasParentMenu }
            >
              { selection.selectionLabel }
              <Icon name="delete" onClick={ onRemove } />
            </Label>
          ) )
        }
        { selections.length > 0 &&
          <div
            className="ui label clear_filter"
            onClick={ removeAll }
            onKeyDown={ removeAll }
            role="button"
            tabIndex={ 0 }
          >
            CLEAR ALL
          </div>
        }
      </div>
    );
  }
}

FilterSelections.propTypes = {
  selections: array,
  onRemove: func,
  removeAll: func
};

export default FilterSelections;
