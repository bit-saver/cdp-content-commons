import React, { Component } from 'react';
import FilterMenuItem from './FilterMenuItem';
import FilterSelections from './FilterSelections';
import './FilterMenu.css';

class FilterMenu extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      filterSelections: [],
      displaySubMenu: false,
      isChecked: false
    };

    this.handleFilterSelect = this.handleFilterSelect.bind( this );
    this.updateFilterSelections = this.updateFilterSelections.bind( this );
    this.showSubMenu = this.showSubMenu.bind( this );
    this.closeSubMenu = this.closeSubMenu.bind( this );
    this.updateIsChecked = this.updateIsChecked.bind( this );
  }

  handleFilterSelect( e ) {
    const filterSelectionLabel = e.target.textContent;
    const filterSelection = e.target.previousSibling.value;

    this.showSubMenu( filterSelection );

    if ( !this.state.filterSelections.some( sel => sel.selectionLabel === filterSelectionLabel ) ) {
      this.setState( {
        filterSelections: [
          ...this.state.filterSelections,
          { selectionValue: filterSelection, selectionLabel: filterSelectionLabel }
        ]
      } );
    }
  }

  updateFilterSelections( e ) {
    const filterToRemove = e.target.parentNode.textContent;
    const { filterSelections } = this.state;
    
    const updatedFilterSelections = filterSelections.filter( sel => sel.selectionLabel !== filterToRemove );
    this.setState( { filterSelections: updatedFilterSelections } );

    // const filterValue = e.target.parentNode.dataset.label;
    // const checkbox = document.querySelector(`[value=${filterValue}]`);
    // checkbox.parentNode.classList.remove('checked');

    this.updateIsChecked();
  }

  updateIsChecked() {
    this.setState( { isChecked: !this.state.isChecked } );
  }

  showSubMenu( filterSelection ) {
    const activeSubMenu = document.querySelector( '.filterMenu_sub.show' );
    if ( !activeSubMenu ) {
      const subMenu = document.querySelector( `[data-submenu-for=${filterSelection}]` );
      if ( subMenu ) { this.setState( { displaySubMenu: true } ); }
    }
  }

  closeSubMenu() {
    this.setState( { displaySubMenu: false } );
  }

  render() {
    return (
      <div className="filterMenu_wrapper">
        { /*
        SELECTION DISPLAY
         */ }
        <FilterSelections
          selections={ this.state.filterSelections }
          onremove={ this.updateFilterSelections }
        />

        { /*
        MAIN-MENU
         */ }
        <div className="filterMenu_main">
          <FilterMenuItem
            menuName="Most Recent"
            handleFilterSelect={ this.handleFilterSelect }
            isSubMenuOpen={ this.state.displaySubMenu }
            closeSubMenu={ this.closeSubMenu }
            isChecked={ this.state.isChecked }
            updateIsChecked={ this.updateIsChecked }
            menuOptions={ [
              { optionLabel: 'Most Recent', optionValue: 'mostRecent', hasSubMenu: false },
              { optionLabel: 'Past Hour', optionValue: 'pastHour', hasSubMenu: false },
              { optionLabel: 'Past 24 Hours', optionValue: 'past24Hours', hasSubMenu: false },
              { optionLabel: 'Past Week', optionValue: 'pastWeek', hasSubMenu: false },
              { optionLabel: 'Past Month', optionValue: 'pastMonth', hasSubMenu: false },
              { optionLabel: 'Past Year', optionValue: 'pastYear', hasSubMenu: false },
              { optionLabel: 'Oldest', optionValue: 'oldest', hasSubMenu: false },
              { optionLabel: 'Custom', optionValue: 'custom', hasSubMenu: false }
            ] }
          />
          <FilterMenuItem
            menuName="Format"
            handleFilterSelect={ this.handleFilterSelect }
            isSubMenuOpen={ this.state.displaySubMenu }
            closeSubMenu={ this.closeSubMenu }
            isChecked={ this.state.isChecked }
            updateIsChecked={ this.updateIsChecked }
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
            handleFilterSelect={ this.handleFilterSelect }
            isSubMenuOpen={ this.state.displaySubMenu }
            closeSubMenu={ this.closeSubMenu }
            isChecked={ this.state.isChecked }
            updateIsChecked={ this.updateIsChecked }
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
            handleFilterSelect={ this.handleFilterSelect }
            isSubMenuOpen={ this.state.displaySubMenu }
            closeSubMenu={ this.closeSubMenu }
            isChecked={ this.state.isChecked }
            updateIsChecked={ this.updateIsChecked }
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
            handleFilterSelect={ this.handleFilterSelect }
            isSubMenuOpen={ this.state.displaySubMenu }
            closeSubMenu={ this.closeSubMenu }
            isChecked={ this.state.isChecked }
            updateIsChecked={ this.updateIsChecked }
            useCheckbox
            menuOptions={ [
              { optionLabel: 'Art', optionValue: 'art', hasSubMenu: false },
              { optionLabel: 'Business', optionValue: 'business', hasSubMenu: false },
              { optionLabel: 'Education', optionValue: 'education', hasSubMenu: false },
              { optionLabel: 'Policy', optionValue: 'policy', hasSubMenu: false },
              { optionLabel: 'Region', optionValue: 'region', hasSubMenu: false }
            ] }
          />
        </div>

        { /*
        SUB-MENUS
         */ }
        <div
          className={ this.state.displaySubMenu ? 'filterMenu_sub show' : 'filterMenu_sub' }
          data-submenu-for="video"
        >
          <FilterMenuItem
            menuName="File Type"
            handleFilterSelect={ this.handleFilterSelect }
            isSubMenuOpen={ this.state.displaySubMenu }
            closeSubMenu={ this.closeSubMenu }
            isChecked={ this.state.isChecked }
            updateIsChecked={ this.updateIsChecked }
            menuOptions={ [
              { optionLabel: '.mp4', optionValue: 'mp4' },
              { optionLabel: '.mov', optionValue: 'mov' }
            ] }
          />
          <FilterMenuItem
            menuName="Length"
            handleFilterSelect={ this.handleFilterSelect }
            isSubMenuOpen={ this.state.displaySubMenu }
            closeSubMenu={ this.closeSubMenu }
            isChecked={ this.state.isChecked }
            updateIsChecked={ this.updateIsChecked }
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
      </div>
    );
  }
}

export default FilterMenu;
