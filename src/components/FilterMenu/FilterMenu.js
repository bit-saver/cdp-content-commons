import React, { Component } from 'react';
import { func, object } from 'prop-types';
import FilterMenuItem from './FilterMenuItem';
import FilterSelections from './FilterSelections';
import * as actions from '../../actions';
import { LANGUAGE_CHANGE, CATEGORY_CHANGE } from '../../actions/types';
import { connect } from 'react-redux';

import './FilterMenu.css';

class FilterMenu extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      filterSelections: [
        {
          value: this.props.language.currentLanguage.locale,
          label: this.props.language.currentLanguage.display_name,
          filter: 'language'
        }
      ],
      subMenuVal: '',
      displaySubMenu: false
    };

    this.handleFilterSelect = this.handleFilterSelect.bind( this );
    this.updateFilterSelections = this.updateFilterSelections.bind( this );
    this.clearAllFilterSelections = this.clearAllFilterSelections.bind( this );
    this.showSubMenu = this.showSubMenu.bind( this );
    this.closeSubMenu = this.closeSubMenu.bind( this );
  }

  componentWillMount() {
    this.props.loadLanguages();
    this.props.loadCategories();
  }

  getOptions = ( type ) => {
    if ( !type.list ) return [];

    return type.list.map( item => ( {
      optionLabel: item.display,
      optionValue: item.key,
      count: item.count,
      hasSubMenu: false
    } ) );
  };

  updateSearchQuery( {
    action, value, label, checked
  } ) {
    switch ( action ) {
      case LANGUAGE_CHANGE:
        this.props.languageUpdate( { locale: value, display_name: label } );
        this.props.createRequest();
        break;

      case CATEGORY_CHANGE:
        // this.props.categoryUpdate( value, checked );
        break;

      default: {
        // console.log( 'in' );
      }
    }
  }

  handleFilterSelect( e, selected ) {
    this.updateSearchQuery( selected );
    console.log( 'handleFilterSelect' );
    const filterSelectionLabel = e.target.textContent;
    const filterSelection = e.target.previousSibling.value;
    const inputType = e.target.previousSibling.type;
    const hasParentMenu = e.target.parentNode.dataset.parentmenu ? e.target.parentNode.dataset.parentmenu : '';
    const { filterSelections } = this.state;

    this.showSubMenu( filterSelection );

    const isTargetInFilterSelections = filterSelections.some( sel => sel.selectionValue === filterSelection );

    if ( !isTargetInFilterSelections ) {
      this.setState( {
        filterSelections: [
          ...filterSelections,
          {
            value: filterSelection,
            label: filterSelectionLabel,
            hasParentMenu
          }
        ]
      } );
    } else if ( isTargetInFilterSelections && inputType === 'checkbox' ) {
      const updatedFilterSelections = filterSelections.filter( sel => sel.value !== filterSelection );
      this.setState( { filterSelections: updatedFilterSelections } );
    }
  }

  updateFilterSelections( e ) {
    const filterToRemove = e.target.parentNode.dataset.label;
    const { filterSelections } = this.state;
    const updatedFilterSelections = filterSelections
      .filter( sel => sel.hasParentMenu !== filterToRemove )
      .filter( sel => sel.value !== filterToRemove );

    this.setState( { filterSelections: updatedFilterSelections } );
  }

  clearAllFilterSelections() {
    this.setState( { filterSelections: [] } );
  }

  showSubMenu( filterSelection ) {
    const activeSubMenu = document.querySelector( '.filterMenu_sub.show' );
    if ( !activeSubMenu ) {
      const subMenu = document.querySelector( `[data-submenu-for=${filterSelection}]` );
      if ( subMenu ) {
        this.setState( { displaySubMenu: true, subMenuVal: filterSelection } );
      }
    }
  }

  closeSubMenu() {
    this.setState( { displaySubMenu: false } );
  }

  render() {
    return (
      <section className="filterMenu_wrapper">
        { /* SELECTION DISPLAY */ }
        { /* <FilterSelections
          selections={ this.state.filterSelections }
          onRemove={ this.updateFilterSelections }
          removeAll={ this.clearAllFilterSelections }
        /> */ }
        <FilterSelections selections={ this.state.filterSelections } />
        <div className={ this.state.displaySubMenu ? 'filterMenu_main subMenuDisplay' : 'filterMenu_main' }>
          { /*  MAIN-MENU */ }
          <FilterMenuItem
            menuName="Most Recent"
            filterSelections={ this.state.filterSelections }
            handleFilterSelect={ this.handleFilterSelect }
            closeSubMenu={ this.closeSubMenu }
            menuOptions={ [
              { optionLabel: 'Most Recent', optionValue: 'mostRecent', hasSubMenu: false },
              { optionLabel: 'Past Hour', optionValue: 'pastHour', hasSubMenu: false },
              { optionLabel: 'Past 24 Hours', optionValue: 'past24Hours', hasSubMenu: false },
              { optionLabel: 'Past Week', optionValue: 'pastWeek', hasSubMenu: false },
              { optionLabel: 'Past Month', optionValue: 'pastMonth', hasSubMenu: false },
              { optionLabel: 'Past Year', optionValue: 'pastYear', hasSubMenu: false },
              { optionLabel: 'Oldest', optionValue: 'oldest', hasSubMenu: false },
              { optionLabel: 'Custom', optionValue: 'custom', hasSubMenu: true }
            ] }
          />
          <FilterMenuItem
            menuName="Format"
            filterSelections={ this.state.filterSelections }
            handleFilterSelect={ this.handleFilterSelect }
            closeSubMenu={ this.closeSubMenu }
            menuOptions={ [
              { optionLabel: 'Article', optionValue: 'article', hasSubMenu: false },
              { optionLabel: 'Audio', optionValue: 'audio', hasSubMenu: false },
              { optionLabel: 'Course', optionValue: 'course', hasSubMenu: false },
              { optionLabel: 'Image', optionValue: 'image', hasSubMenu: false },
              { optionLabel: 'Publication', optionValue: 'publication', hasSubMenu: false },
              { optionLabel: 'Quiz', optionValue: 'quiz', hasSubMenu: false },
              { optionLabel: 'Video', optionValue: 'video', hasSubMenu: true }
            ] }
          />
          <FilterMenuItem
            menuName="Source"
            filterSelections={ this.state.filterSelections }
            handleFilterSelect={ this.handleFilterSelect }
            closeSubMenu={ this.closeSubMenu }
            useCheckbox
            menuOptions={ [
              { optionLabel: 'American Spaces', optionValue: 'american_spaces', hasSubMenu: false },
              { optionLabel: 'IIP Interactive', optionValue: 'iip_interactive', hasSubMenu: false },
              { optionLabel: 'IIP Video Production', optionValue: 'iip_video_prod', hasSubMenu: false },
              { optionLabel: 'ShareAmerica', optionValue: 'share_america', hasSubMenu: false },
              { optionLabel: 'YALI', optionValue: 'yali', hasSubMenu: false },
              { optionLabel: 'YLAI', optionValue: 'ylai', hasSubMenu: false }
            ] }
          />
          <FilterMenuItem
            menuName="Language"
            searchAction={ LANGUAGE_CHANGE }
            filterSelections={ this.state.filterSelections }
            handleFilterSelect={ this.handleFilterSelect }
            closeSubMenu={ this.closeSubMenu }
            menuOptions={ this.getOptions( this.props.language ) }
          />
          <FilterMenuItem
            menuName="Category"
            searchAction={ CATEGORY_CHANGE }
            filterSelections={ this.state.filterSelections }
            handleFilterSelect={ this.handleFilterSelect }
            closeSubMenu={ this.closeSubMenu }
            useCheckbox
            menuOptions={ this.getOptions( this.props.category ) }
          />

          { /* SUB-MENUS */ }
          <div
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
          </div>
        </div>
      </section>
    );
  }
}

FilterMenu.propTypes = {
  loadLanguages: func,
  languageUpdate: func,
  loadCategories: func,
  createRequest: func,
  language: object,
  category: object
};

const mapStateToProps = state => ( {
  search: state.search,
  language: state.language,
  category: state.category
} );

export default connect( mapStateToProps, actions )( FilterMenu );
