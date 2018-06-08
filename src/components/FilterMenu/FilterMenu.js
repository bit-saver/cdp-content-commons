import React, { Component } from 'react';
import { func, object } from 'prop-types';
import FilterMenuItem from './FilterMenuItem';
import FilterSelections from './FilterSelections';
import * as actions from '../../actions';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';

import './FilterMenu.css';

class FilterMenu extends Component {
  componentWillMount() {
    this.props.loadLanguages();
    this.props.loadCategories();
    this.props.loadPostTypes();
    this.props.loadSources();
  }

  getOptions = ( type ) => {
    if ( !type.list.length ) return [];

    return type.list.map( item => ( {
      label: item.display,
      value: item.key,
      count: item.count,
      hasSubMenu: false
    } ) );
  };

  // TODO: make all prop names consistent
  updateSearchQuery = ( {
    filter, value, labelclean, checked
  } ) => {
    switch ( filter.toLowerCase() ) {
      case 'language':
        this.props.languageUpdate( { key: value, display_name: labelclean } );
        break;

      case 'category':
        this.props.categoryUpdate( { id: value, display_name: labelclean, checked } );
        break;

      case 'format':
        this.props.postTypeUpdate( { type: value, display_name: labelclean, checked } );
        break;

      case 'source':
        this.props.sourceUpdate( { key: value, display_name: labelclean, checked } );
        break;

      case 'most recent':
        this.props.dateUpdate( { key: value, display: labelclean } );
        break;

      default: {
        // console.log( 'in' );
      }
    }
    this.props.createRequest();
  };

  // state will reset if no selected value is sent
  handleFilterClearAll = () => {
    this.props.categoryUpdate();
    this.props.postTypeUpdate();
    this.props.sourceUpdate();
    this.props.languageUpdate();
    this.props.dateUpdate();
    this.props.createRequest();
  };

  render() {
    return (
      <section className="filterMenu_wrapper">
        { /* SELECTION DISPLAY */ }
        <FilterSelections onFilterChange={ this.updateSearchQuery } onFilterClearAll={ this.handleFilterClearAll } />

        <div className="filterMenu_main">
          { /*  MAIN-MENU */ }
          <FilterMenuItem
            filter="Most Recent"
            onFilterChange={ this.updateSearchQuery }
            selected={ this.props.date.currentDate }
            closeSubMenu={ this.closeSubMenu }
            options={ this.getOptions( this.props.date ) }
          >
            <Form.Radio />
          </FilterMenuItem>
          <FilterMenuItem
            filter="Format"
            options={ this.getOptions( this.props.type ) }
            onFilterChange={ this.updateSearchQuery }
            selected={ this.props.type.currentPostTypes }
            closeSubMenu={ this.closeSubMenu }
          >
            <Form.Checkbox />
          </FilterMenuItem>
          <FilterMenuItem
            filter="Source"
            onFilterChange={ this.updateSearchQuery }
            closeSubMenu={ this.closeSubMenu }
            selected={ this.props.source.currentSources }
            options={ this.getOptions( this.props.source ) }
          >
            <Form.Checkbox />
          </FilterMenuItem>
          <FilterMenuItem
            filter="Language"
            options={ this.getOptions( this.props.language ) }
            selected={ this.props.language.currentLanguage }
            onFilterChange={ this.updateSearchQuery }
          >
            <Form.Radio />
          </FilterMenuItem>

          <FilterMenuItem
            filter="Category"
            options={ this.getOptions( this.props.category ) }
            onFilterChange={ this.updateSearchQuery }
            selected={ this.props.category.currentCategories }
          >
            <Form.Checkbox />
          </FilterMenuItem>
        </div>
      </section>
    );
  }
}

FilterMenu.propTypes = {
  loadLanguages: func,
  loadCategories: func,
  loadPostTypes: func,
  loadSources: func,
  languageUpdate: func,
  categoryUpdate: func,
  postTypeUpdate: func,
  sourceUpdate: func,
  dateUpdate: func,
  createRequest: func,
  language: object,
  category: object,
  type: object,
  source: object,
  date: object
};

const mapStateToProps = state => ( {
  search: state.search,
  language: state.language,
  category: state.category,
  type: state.type,
  source: state.source,
  date: state.date
} );

export default connect( mapStateToProps, actions )( FilterMenu );
