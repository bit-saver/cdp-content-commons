import React, { Component } from 'react';
import FilterMenuItem from './FilterMenuItem';
import FilterSelections from './FilterSelections';
import './FilterMenu.css';

class FilterMenu extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      filterSelections: [],
      subMenuVal: '',
      displaySubMenu: false
    };

    this.handleFilterSelect = this.handleFilterSelect.bind( this );
    this.updateFilterSelections = this.updateFilterSelections.bind( this );
    this.clearAllFilterSelections = this.clearAllFilterSelections.bind( this );
    this.showSubMenu = this.showSubMenu.bind( this );
    this.closeSubMenu = this.closeSubMenu.bind( this );
  }

  handleFilterSelect( e ) {
    const filterSelectionLabel = e.target.textContent;
    const filterSelection = e.target.previousSibling.value;
    const inputType = e.target.previousSibling.type;
    const { filterSelections } = this.state;

    this.showSubMenu( filterSelection );

    const isTargetInFilterSelections = filterSelections.some( sel => sel.selectionValue === filterSelection );

    if ( !isTargetInFilterSelections ) {
      this.setState( {
        filterSelections: [
          ...filterSelections,
          { selectionValue: filterSelection, selectionLabel: filterSelectionLabel }
        ]
      } );
    } else if ( isTargetInFilterSelections && inputType === 'checkbox' ) {
      const updatedFilterSelections = filterSelections.filter( sel => sel.selectionValue !== filterSelection );
      this.setState( { filterSelections: updatedFilterSelections } );
    }
  }

  updateFilterSelections( e ) {
    const filterToRemove = e.target.parentNode.dataset.label;
    const { filterSelections } = this.state;
    const updatedFilterSelections = filterSelections.filter( sel => sel.selectionValue !== filterToRemove );
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
        { /*
        SELECTION DISPLAY
         */ }
        <FilterSelections
          selections={ this.state.filterSelections }
          onRemove={ this.updateFilterSelections }
          removeAll={ this.clearAllFilterSelections }
        />

        <div className={ this.state.displaySubMenu ? 'filterMenu_main subMenuDisplay' : 'filterMenu_main' }>
          { /*
          MAIN-MENU
           */ }
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
            filterSelections={ this.state.filterSelections }
            handleFilterSelect={ this.handleFilterSelect }
            closeSubMenu={ this.closeSubMenu }
            useCheckbox
            menuOptions={ [
              { optionLabel: 'English', optionValue: 'english', hasSubMenu: false },
              { optionLabel: 'Espanol', optionValue: 'spanish', hasSubMenu: false },
              { optionLabel: 'Francais', optionValue: 'french', hasSubMenu: false },
              { optionLabel: 'Portugues', optionValue: 'portuguese', hasSubMenu: false },
              { optionLabel: 'Pyccknn', optionValue: 'something', hasSubMenu: false }
            ] }
          />
          <FilterMenuItem
            menuName="Category"
            filterSelections={ this.state.filterSelections }
            handleFilterSelect={ this.handleFilterSelect }
            closeSubMenu={ this.closeSubMenu }
            useCheckbox
            menuOptions={ [
              { optionLabel: 'Art', optionValue: 'art', hasSubMenu: false },
              { optionLabel: 'Business', optionValue: 'business', hasSubMenu: false },
              { optionLabel: 'Education', optionValue: 'education', hasSubMenu: false },
              { optionLabel: 'Policy', optionValue: 'policy', hasSubMenu: false },
              { optionLabel: 'Region', optionValue: 'region', hasSubMenu: false }
            ] }
          />

          { /*
          SUB-MENUS
           */ }
          <div
            className={
              this.state.displaySubMenu && this.state.subMenuVal === 'video'
              ? 'filterMenu_sub show'
              : 'filterMenu_sub'
            }
            data-submenu-for="video"
          >
            <FilterMenuItem
              menuName="File Type"
              filterSelections={ this.state.filterSelections }
              handleFilterSelect={ this.handleFilterSelect }
              closeSubMenu={ this.closeSubMenu }
              menuOptions={ [
                { optionLabel: '.mp4', optionValue: 'mp4' },
                { optionLabel: '.mov', optionValue: 'mov' }
              ] }
            />
            <FilterMenuItem
              menuName="Length"
              filterSelections={ this.state.filterSelections }
              handleFilterSelect={ this.handleFilterSelect }
              closeSubMenu={ this.closeSubMenu }
              menuOptions={ [
                { optionLabel: '< 1 minute', optionValue: 'opt_under1minute' },
                { optionLabel: '1-5 minutes', optionValue: 'opt_1_5minutes' },
                { optionLabel: '5-10 minute', optionValue: 'opt_5_10minutes' },
                { optionLabel: '10-15 minute', optionValue: 'opt_10_15minutes' },
                { optionLabel: '15-30 minute', optionValue: 'opt_15_30minutes' },
                { optionLabel: '> 30 minute', optionValue: 'opt_greater30minutes' }
              ] }
            />
          </div>
          <div
            className={
              this.state.displaySubMenu && this.state.subMenuVal === 'custom'
              ? 'filterMenu_sub show'
              : 'filterMenu_sub'
            }
            data-submenu-for="custom"
          >
            <FilterMenuItem
              menuName="Custom 1"
              filterSelections={ this.state.filterSelections }
              handleFilterSelect={ this.handleFilterSelect }
              closeSubMenu={ this.closeSubMenu }
              menuOptions={ [
                { optionLabel: 'Custom 1', optionValue: 'custom_1' },
                { optionLabel: 'Custom 2', optionValue: 'custom_2' }
              ] }
            />
            <FilterMenuItem
              menuName="Custom 2"
              filterSelections={ this.state.filterSelections }
              handleFilterSelect={ this.handleFilterSelect }
              closeSubMenu={ this.closeSubMenu }
              menuOptions={ [
                { optionLabel: 'Test 1', optionValue: 'opt_test1' },
                { optionLabel: 'Test 2', optionValue: 'opt_test2' }
              ] }
            />
          </div>
        </div>
      </section>
    );
  }
}

export default FilterMenu;
