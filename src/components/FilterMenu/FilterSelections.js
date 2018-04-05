import React, { Component } from 'react';
import { func, array, object } from 'prop-types';
import { Label, Icon } from 'semantic-ui-react';
import FilterSelectionItem from './FilterSelectionItem';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import './FilterSelections.css';

class FilterSelections extends Component {
  state = { selections: this.props.selections };

  componentWillReceiveProps( nextProps ) {
    // if language has changed
    if ( this.props.language.currentLanguage.locale !== nextProps.language.currentLanguage.locale ) {
      const currentSelections = this.updateLanguage( nextProps );

      this.setState( {
        selections: currentSelections
      } );
    }
  }

  handleOnRemove = ( e, obj ) => {};

  updateLanguage( nextProps ) {
    const { selections } = this.state;
    const nextLanguage = nextProps.language.currentLanguage;
    let items;
    const item = {
      label: nextLanguage.display_name,
      value: nextLanguage.locale,
      filter: 'language'
    };

    // if previous language exists, remove it
    if ( this.props.language ) {
      items = selections.filter( sel => sel.value !== this.props.language.currentLanguage.locale );
    }

    // return new language
    return items ? [...items, item] : [...selections, item];
  }

  render() {
    const { selections } = this.state;

    return (
      <div className="filterMenu_selections">
        { selections.length > 0 &&
          selections.map( selection => (
            <FilterSelectionItem
              key={ selection.value }
              value={ selection.value }
              label={ selection.label }
              filter={ selection.filter }
              onClick={ this.handleOnRemove }
            />
          ) ) }
        { selections.length > 0 && (
          <div className="ui label clear_filter" role="button" tabIndex={ 0 }>
            CLEAR ALL
          </div>
        ) }
      </div>
    );
  }
}

FilterSelections.propTypes = {
  selections: array,
  // removeAll: func,
  language: object
};

const mapStateToProps = state => ( {
  search: state.search,
  language: state.language,
  category: state.category
} );

export default connect( mapStateToProps, actions )( FilterSelections );
