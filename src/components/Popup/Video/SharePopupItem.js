import React, { Component } from 'react';
import PopupWrapper from '../PopupWrapper';
import PopupMenu from '../PopupMenu';
import PopupMenuItem from '../PopupMenuItem';
import PopupContent from '../PopupContent';
import PopupContentItem from '../PopupContentItem';
import ClipboardCopy from '../../ClipboardCopy/ClipboardCopy';
import { Image, Input } from 'semantic-ui-react';
import facebookLogo from '../../../assets/images/VideoShareDownload/facebook.png';
import twitterLogo from '../../../assets/images/VideoShareDownload/twitter.png';
import darkowlLogo from '../../../assets/images/VideoShareDownload/darkowl.png';

class SharePopupItem extends Component {
  render() {
  	return(
  	  <PopupWrapper title='How would you like to share this video?'>
  	    <PopupMenu>
          <PopupMenuItem 
	        domProps={{className: 'popupElem_menu_item', 'data-menu-item': '1', onClick: this.menuItemOnClick}} 
	        content='Copy Shortcode'
	      />
	      <PopupMenuItem 
	        domProps={{className: 'popupElem_menu_item', 'data-menu-item': '2', onClick: this.menuItemOnClick}} 
	        content='Social'
	      />
	      <PopupMenuItem 
	        domProps={{className: 'popupElem_menu_item', 'data-menu-item': '3', onClick: this.menuItemOnClick}} 
	        content='More'
	      />
	      <PopupMenuItem 
	        domProps={{className: 'popupElem_menu_item popupElem_menu_item--last', 'data-menu-item': '4', onClick: this.menuItemOnClick}} 
	        content='Help'
	      />
  	    </PopupMenu>
  	    <PopupContent>
  	      <PopupContentItem 
        	  domProps={{ className: 'popupElem_content_item popupElem_content_item--show', 'data-content': '1' }}
        	  headline='Copy the links to this video from third party sites.'
        	>
            <ClipboardCopy label='Closed Captions' copyItem='[loremipsum.lipsum.lorem1]' info='Display this video with closed captions' />
            <ClipboardCopy label='Open Captions' copyItem='[loremipsum.lipsum.lorem2]' info='Display this video with open captions' />
            <ClipboardCopy label='Source File' copyItem='[loremipsum.lipsum.lorem3]' info='Display original video with open captions in multiple languages' />        	  
        	</PopupContentItem>
        	
        	<PopupContentItem 
        	  domProps={{ className: 'popupElem_content_item', 'data-content': '2' }}
        	  headline='Share this video on your linked social media accounts.'
        	>        	  
            <div className='shareSocial'>
              <div className='logos'>              
                <Image src={facebookLogo} size='tiny' />
                <Image src={twitterLogo} size='tiny' />
                <Image src={darkowlLogo} size='tiny' />
              </div>
              <Input value='Content Link' disabled />
            </div>
        	</PopupContentItem>
        	
        	<PopupContentItem 
        	  domProps={{ className: 'popupElem_content_item', 'data-content': '3' }}
        	  headline='Copy the links to this video from third party sites.'
        	>
        	  <ClipboardCopy label='YouTube URL' copyItem='https://loremipsum.youtube.lorem' info='Link to this video on YouTube' />
            <ClipboardCopy label='Vimeo URL' copyItem='https://loremipsum.vimeo.lorem' info='Link to this video on Vimeo' />
        	</PopupContentItem>
        	
        	<PopupContentItem domProps={{ className: 'popupElem_content_item', 'data-content': '4' }} >
        	  <div className='popupElem_content_item_textOnly'>   
              <p>I don't see what I'm looking for...(link to Dev Tools)</p>
          	  <p>Whay can't I use an open captions file for social media?</p>      	  
            </div>
        	</PopupContentItem>
  	    </PopupContent>
  	  </PopupWrapper>
  	);
  }
}

export default SharePopupItem;