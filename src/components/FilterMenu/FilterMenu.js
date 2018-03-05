import React, { Component } from 'react';
import { Form, Icon, Dropdown, Input, Radio } from 'semantic-ui-react';


class FilterMenu extends Component {
  
  state = {};

  handleOnChange = (e, { value }) => this.setState({ value });

  displayMenuOnClick = (e) => {
  	const 
  	  menuLabel = e.target,
  	  menu = menuLabel.nextSibling;
  	  
  	this.menuReset();
  	
  	menuLabel.classList.add('active');
  	menu.classList.add('show');
  }

  menuOffClick = () => {
  	document.addEventListener('click', (e) => {
		console.log(e);
  		console.log(e.srcElement);
  		console.log(e.srcElement.tagName === 'LABEL');

  		// Use UI State to store label & filterMenu_label states?  		
  		if( !e.srcElement.tagName === 'LABEL' || !e.target.classList.contains('filterMenu_label') ) {
  		  this.menuReset();
  		}


  	});
  }

  menuReset = () => {
  	const activeMenu = document.querySelector('.filterMenu_options.show'),  	
		  activeMenuLabel = document.querySelector('.filterMenu_label.active');
  		  
    if( !!activeMenu ) activeMenu.classList.remove('show');
    if( !!activeMenuLabel ) activeMenuLabel.classList.remove('active');
  }

  testOnSelect = e => console.log(e);

  componentDidMount() {
  	this.menuOffClick();
  }


  render() {
  	const { value } = this.state;

  	return(  	    	    
  	  <div className='filterMenu_wrapper'>
  	    <div className='filterMenu'>
  	  	  <span className='filterMenu_label' onClick={this.displayMenuOnClick}>Most Recent <Icon name='chevron up' /></span>  	  	  	
  	  	  <Form className='filterMenu_options'>
  	  	    <Form.Group>
  	  	      <Form.Radio label='Most Recent' value='mostRecent' checked={value === 'mostRecent'} onChange={this.handleOnChange} />
  	  	      <Form.Radio label='Past Hour' value='pastHour' checked={value === 'pastHour'} onChange={this.handleOnChange} />
  	  	      <Form.Radio label='Past 24 Hours' value='past24Hours' checked={value === 'past24Hours'} onChange={this.handleOnChange} />
  	  	      <Form.Radio label='Past Week' value='pastWeek' checked={value === 'pastWeek'} onChange={this.handleOnChange} />
  	  	      <Form.Radio label='Past Month' value='pastMonth' checked={value === 'pastMonth'} onChange={this.handleOnChange} />
  	  	      <Form.Radio label='Past Year' value='pastYear' checked={value === 'pastYear'} onChange={this.handleOnChange} />
  	  	      <Form.Radio label='Oldest' value='oldest' checked={value === 'oldest'} onChange={this.handleOnChange} />  	  	    
  	  	      <Form.Radio label='Custom' value='custom' checked={value === 'custom'} onChange={this.handleOnChange} />
  	  	    </Form.Group>	
  	  	  </Form>
  	    </div>

  	    <div className='filterMenu'>
  	  	  <span className='filterMenu_label' onClick={this.displayMenuOnClick}>Format <Icon name='chevron up' /></span>  	  	  	
  	  	  <Form className='filterMenu_options'>
  	  	    <Form.Group>
  	  	      <Form.Radio label='Article' value='article' checked={value === 'article'} onChange={this.handleOnChange} />
  	  	      <Form.Radio label='Audio' value='audio' checked={value === 'audio'} onChange={this.handleOnChange} />
  	  	      <Form.Radio label='Course' value='course' checked={value === 'course'} onChange={this.handleOnChange} />
  	  	      <Form.Radio label='Image' value='image' checked={value === 'image'} onChange={this.handleOnChange} />
  	  	      <Form.Radio label='Publication' value='publication' checked={value === 'publication'} onChange={this.handleOnChange} />
  	  	      <Form.Radio label='Quiz' value='quiz' checked={value === 'quiz'} onChange={this.handleOnChange} />
  	  	      <Form.Radio label='Video' value='video' checked={value === 'video'} onChange={this.handleOnChange} />
  	  	    </Form.Group>	
  	  	  </Form>
  	    </div>

  	    <div className='filterMenu'>
  	  	  <span className='filterMenu_label' onClick={this.displayMenuOnClick}>Source <Icon name='chevron up' /></span>  	  	  	
  	  	  <Form className='filterMenu_options'>
  	  	    <Form.Group>
  	  	      <Form.Checkbox label='American Spaces' value='american_spaces' />
  	  	      <Form.Checkbox label='IIP Interactive' value='iip_interactive' />
  	  	      <Form.Checkbox label='IIP Video Production' value='iip_video_prod' />
  	  	      <Form.Checkbox label='ShareAmerica' value='share_america' />
  	  	      <Form.Checkbox label='YALI' value='yali' />
  	  	      <Form.Checkbox label='YLAI' value='ylai' />	  	  	    
  	  	    </Form.Group>	
  	  	  </Form>
  	    </div>

  	    <div className='filterMenu'>
  	  	  <span className='filterMenu_label' onClick={this.displayMenuOnClick}>Language <Icon name='chevron up' /></span>  	  	  	
  	  	  <Form className='filterMenu_options'>
  	  	    <Form.Group>
  	  	      <Form.Checkbox label='English' value='english' />
  	  	      <Form.Checkbox label='Espanol' value='spanish' />
  	  	      <Form.Checkbox label='Francais' value='french' />
  	  	      <Form.Checkbox label='Portugues' value='portuguese' />
  	  	      <Form.Checkbox label='Pyccknn' value='something' />	  	  	    
  	  	    </Form.Group>	
  	  	  </Form>
  	    </div> 

  	    <div className='filterMenu'>
  	   	  <span className='filterMenu_label' onClick={this.displayMenuOnClick}>Category <Icon name='chevron up' /></span>  	  	  	
  	  	  <Form className='filterMenu_options'>
  	  	    <Form.Group>
  	  	      <Form.Checkbox label='Art' value='art' />
  	  	      <Form.Checkbox label='Business' value='business' />
  	  	      <Form.Checkbox label='Education' value='education' />
  	  	      <Form.Checkbox label='Policy' value='policy' />
  	  	      <Form.Checkbox label='Region' value='region' />	  	  	    
  	  	    </Form.Group>	
  	  	  </Form>
  	    </div>  

	  </div>
  	);
  }
}

export default FilterMenu;