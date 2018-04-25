import React, { Component } from 'react';
import { func, object } from 'prop-types';
import FilterMenuItem from './FilterMenuItem';
import FilterSelections from './FilterSelections';
import * as actions from '../../actions';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';

import './FilterMenu.css';

class FilterMenu extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      // subMenuVal: '',
      displaySubMenu: false
    };

    this.showSubMenu = this.showSubMenu.bind( this );
    this.closeSubMenu = this.closeSubMenu.bind( this );
  }

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

  updateSearchQuery = ( {
    filter, value, labelclean, checked
  } ) => {
    switch ( filter.toLowerCase() ) {
      case 'language':
        this.props.languageUpdate( { locale: value, display_name: labelclean } );
        break;

      case 'category':
        this.props.categoryUpdate( { id: value, display_name: labelclean, checked } );
        break;

      case 'format':
        this.props.postTypeUpdate( { type: value, display_name: labelclean, checked } );
        break;

      case 'source':
        this.props.sourceUpdate( { display_name: labelclean, checked } );
        break;

      default: {
        // console.log( 'in' );
      }
    }
    this.props.createRequest();
  };

  handleFilterClearAll = () => {
    this.props.categoryUpdate();
    this.props.postTypeUpdate();
    this.props.sourceUpdate();
    this.props.createRequest();
  };

  handleFilterSelect = ( e, selected ) => {
    const filterSelection = e.target.previousSibling.value;
    // const hasParentMenu = e.target.parentNode.dataset.parentmenu ? e.target.parentNode.dataset.parentmenu : '';

    this.showSubMenu( filterSelection );
  };

  showSubMenu = ( filterSelection ) => {
    const activeSubMenu = document.querySelector( '.filterMenu_sub.show' );
    if ( !activeSubMenu ) {
      const subMenu = document.querySelector( `[data-submenu-for=${filterSelection}]` );
      if ( subMenu ) {
        // this.setState( { displaySubMenu: true, subMenuVal: filterSelection } );
      }
    }
  };

  closeSubMenu() {
    this.setState( { displaySubMenu: false } );
  }

  render() {
    return (
      <section className="filterMenu_wrapper">
        { /* SELECTION DISPLAY */ }
        <FilterSelections onFilterChange={ this.updateSearchQuery } onFilterClearAll={ this.handleFilterClearAll } />

        <div className={ this.state.displaySubMenu ? 'filterMenu_main subMenuDisplay' : 'filterMenu_main' }>
          { /*  MAIN-MENU */ }
          <FilterMenuItem
            filter="Most Recent"
            onFilterChange={ this.updateSearchQuery }
            closeSubMenu={ this.closeSubMenu }
            options={ [
              { label: 'Most Recent', value: 'mostRecent', hasSubMenu: false },
              { label: 'Past Hour', value: 'pastHour', hasSubMenu: false },
              { label: 'Past 24 Hours', value: 'past24Hours', hasSubMenu: false },
              { label: 'Past Week', value: 'pastWeek', hasSubMenu: false },
              { label: 'Past Month', value: 'pastMonth', hasSubMenu: false },
              { label: 'Past Year', value: 'pastYear', hasSubMenu: false },
              { label: 'Oldest', value: 'oldest', hasSubMenu: false },
              { label: 'Custom', value: 'custom', hasSubMenu: true }
            ] }
          >
            <Form.Radio />
          </FilterMenuItem>
          <FilterMenuItem
            filter="Format"
            options={ this.getOptions( this.props.type ) }
            onFilterChange={ this.updateSearchQuery }
            selected={ this.props.type.currentPostTypes }
            default="video"
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
            default="en-us"
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
          { /* SUB-MENUS */ }
          { /* <div
            className={
              this.state.displaySubMenu && this.state.subMenuVal === 'video' ? 'filterMenu_sub show' : 'filterMenu_sub'
            }
            data-submenu-for="video"
          >
            <FilterMenuItem
              menuName="File Type"
              filterSelections={ this.state.filterSelections }
              handleFilterSelect={ this.handleFilterSelect }
              closeSubMenu={ this.closeSubMenu }
              menuOptions={ [
                { optionLabel: '.mp4', optionValue: 'mp4', parentMenu: 'video' },
                { optionLabel: '.mov', optionValue: 'mov', parentMenu: 'video' }
              ] }
            />
            <FilterMenuItem
              menuName="Length"
              filterSelections={ this.state.filterSelections }
              handleFilterSelect={ this.handleFilterSelect }
              closeSubMenu={ this.closeSubMenu }
              menuOptions={ [
                { optionLabel: '< 1 minute', optionValue: 'opt_under1minute', parentMenu: 'video' },
                { optionLabel: '1-5 minutes', optionValue: 'opt_1_5minutes', parentMenu: 'video' },
                { optionLabel: '5-10 minute', optionValue: 'opt_5_10minutes', parentMenu: 'video' },
                { optionLabel: '10-15 minute', optionValue: 'opt_10_15minutes', parentMenu: 'video' },
                { optionLabel: '15-30 minute', optionValue: 'opt_15_30minutes', parentMenu: 'video' },
                { optionLabel: '> 30 minute', optionValue: 'opt_greater30minutes', parentMenu: 'video' }
              ] }
            />
          </div>
          <div
            className={
              this.state.displaySubMenu && this.state.subMenuVal === 'custom' ? 'filterMenu_sub show' : 'filterMenu_sub'
            }
            data-submenu-for="custom"
          >
            <FilterMenuItem
              menuName="Custom 1"
              filterSelections={ this.state.filterSelections }
              handleFilterSelect={ this.handleFilterSelect }
              closeSubMenu={ this.closeSubMenu }
              menuOptions={ [
                { optionLabel: 'Custom 1', optionValue: 'custom_1', parentMenu: 'custom' },
                { optionLabel: 'Custom 2', optionValue: 'custom_2', parentMenu: 'custom' }
              ] }
            />
            <FilterMenuItem
              menuName="Custom 2"
              filterSelections={ this.state.filterSelections }
              handleFilterSelect={ this.handleFilterSelect }
              closeSubMenu={ this.closeSubMenu }
              menuOptions={ [
                { optionLabel: 'Test 1', optionValue: 'opt_test1', parentMenu: 'custom' },
                { optionLabel: 'Test 2', optionValue: 'opt_test2', parentMenu: 'custom' }
              ] }
            />
          </div> */ }
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
  createRequest: func,
  language: object,
  category: object,
  type: object,
  source: object
};

const mapStateToProps = state => ( {
  search: state.search,
  language: state.language,
  category: state.category,
  type: state.type,
  source: state.source
} );

export default connect( mapStateToProps, actions )( FilterMenu );
