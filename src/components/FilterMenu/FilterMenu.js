import React, { Component } from 'react';
import FilterMenuItem from './FilterMenuItem';

class FilterMenu extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      filterSelection: ''
    };

    this.handleFilterSelect = this.handleFilterSelect.bind( this );
  }

  handleFilterSelect( e ) {
    const filterSelection = e.target.previousSibling.value;
    this.setState( { filterSelection } );

    const subMenu = document.querySelector( `[data-menu-for=${filterSelection}]` );
    if ( subMenu ) {
      subMenu.classList.add( 'show' );
    }
  }

  render() {
    return (
      <div className='filterMenu_wrapper'>
  	    <div className='filterMenu_main'>
          <FilterMenuItem
            menuName='Most Recent'
            handleFilterSelect={ this.handleFilterSelect }
            menuOptions = { [
              { optionLabel: 'Most Recent', optionValue: 'mostRecent' },
              { optionLabel: 'Past Hour', optionValue: 'pastHour' },
              { optionLabel: 'Past 24 Hours', optionValue: 'past24Hours' },
              { optionLabel: 'Past Week', optionValue: 'pastWeek' },
              { optionLabel: 'Past Month', optionValue: 'pastMonth' },
              { optionLabel: 'Past Year', optionValue: 'pastYear' },
              { optionLabel: 'Oldest', optionValue: 'oldest' },
              { optionLabel: 'Custom', optionValue: 'custom' }
            ] }
          />
          <FilterMenuItem
            menuName='Format'
            handleFilterSelect={ this.handleFilterSelect }
            menuOptions = { [
              { optionLabel: 'Article', optionValue: 'article' },
              { optionLabel: 'Audio', optionValue: 'audio' },
              { optionLabel: 'Course', optionValue: 'course' },
              { optionLabel: 'Image', optionValue: 'image' },
              { optionLabel: 'Publication', optionValue: 'publication' },
              { optionLabel: 'Quiz', optionValue: 'quiz' },
              { optionLabel: 'Video', optionValue: 'video' }            
            ] }
          />
          <FilterMenuItem 
            menuName='Source'
            handleFilterSelect={ this.handleFilterSelect }
            useCheckbox
            menuOptions = { [
              { optionLabel: 'American Spaces', optionValue: 'american_spaces' },
              { optionLabel: 'IIP Interactive', optionValue: 'iip_interactive' },
              { optionLabel: 'IIP Video Production', optionValue: 'iip_video_prod' },
              { optionLabel: 'ShareAmerica', optionValue: 'share_america' },
              { optionLabel: 'YALI', optionValue: 'yali' },
              { optionLabel: 'YLAI', optionValue: 'ylai' }
            ] }
          />
          <FilterMenuItem 
            menuName='Language'
            handleFilterSelect={ this.handleFilterSelect }
            useCheckbox
            menuOptions = { [
              { optionLabel: 'English', optionValue: 'english' },
              { optionLabel: 'Espanol', optionValue: 'spanish' },
              { optionLabel: 'Francais', optionValue: 'french' },
              { optionLabel: 'Portugues', optionValue: 'portuguese' },
              { optionLabel: 'Pyccknn', optionValue: 'something' }
            ] }
          />
          <FilterMenuItem 
            menuName='Category'
            handleFilterSelect={ this.handleFilterSelect }
            useCheckbox
            menuOptions = { [
              { optionLabel: 'Art', optionValue: 'art' },
              { optionLabel: 'Business', optionValue: 'business' },
              { optionLabel: 'Education', optionValue: 'education' },
              { optionLabel: 'Policy', optionValue: 'policy' },
              { optionLabel: 'Region', optionValue: 'region' }
            ] }
          />
        </div>

        {/*****************
          SUB
        ******************/}        
        <div className='filterMenu_sub' data-menu-for='video'>
          <FilterMenuItem
            menuName='File Type'            
            menuOptions={[
              { optionLabel: '.mp4', optionValue: 'mp4' },
              { optionLabel: '.mov', optionValue: 'mov' }
            ]}
          />
          <FilterMenuItem
            menuName='Length'
            menuOptions={[
              { optionLabel: '< 1 minute', optionValue: 'under1minute' },
              { optionLabel: '1-5 minutes', optionValue: '1_5minutes' },
              { optionLabel: '5-10 minute', optionValue: '5_10minutes' },
              { optionLabel: '10-15 minute', optionValue: '10_15minutes' },
              { optionLabel: '15-30 minute', optionValue: '15_30minutes' },
              { optionLabel: '> 30 minute', optionValue: 'greater30minutes' }
            ]}
          />
        </div>
	    </div>
    );
  }
}

export default FilterMenu;
