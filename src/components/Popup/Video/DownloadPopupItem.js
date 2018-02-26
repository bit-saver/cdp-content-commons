import React, { Component } from 'react';
import PopupWrapper from '../PopupWrapper';
import PopupMenu from '../PopupMenu';
import PopupMenuItem from '../PopupMenuItem';
import PopupContent from '../PopupContent';
import PopupContentItem from '../PopupContentItem';
import EmbedVideo from '../../Embed/EmbedVideo';

class DownloadPopupItem extends Component {
  render() {
  	return(
  	  <PopupWrapper title='Download this video.'>
  	    <PopupMenu>
          <PopupMenuItem 
	        domProps={{className: 'popupElem_menu_item', 'data-menu-item': '1', onClick: this.menuItemOnClick}} 
	        content='Closed Captions'
	      />
	      <PopupMenuItem 
	        domProps={{className: 'popupElem_menu_item', 'data-menu-item': '2', onClick: this.menuItemOnClick}} 
	        content='Open Captions'
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
        	  headline='Download this video with the closed captions in the language selected. This download option is best for uploading this video to web pages.'
        	>
        	  <EmbedVideo label='Small' embedcode='[loremipsum.lipsum.lorem]' downloadUrl='http://ylai.edit.america.dev/wp-content/uploads/sites/2/2017/12/COE_s-dWsAAJp3S.mp4' specs='Optimized for file size (480x270 | 377 kB/s | 5 MB)' />
            <EmbedVideo label='Medium' embedcode='[loremipsum.lipsum.lorem]' downloadUrl='http://ylai.edit.america.dev/wp-content/uploads/sites/2/2017/12/COE_s-dWsAAJp3S.mp4' specs='Optimized for file size (480x270 | 377 kB/s | 5 MB)' />
            <EmbedVideo label='Large' embedcode='[loremipsum.lipsum.lorem]' downloadUrl='http://ylai.edit.america.dev/wp-content/uploads/sites/2/2017/12/COE_s-dWsAAJp3S.mp4' specs='Optimized for file size (480x270 | 377 kB/s | 5 MB)' />
        	</PopupContentItem>
        	
        	<PopupContentItem 
        	  domProps={{ className: 'popupElem_content_item', 'data-content': '2' }}
        	  headline='Download this video with open captions in the language selected. This download option is best for uploading this video to social media.'
        	>
        	  <EmbedVideo label='Small' embedcode='[loremipsum.lipsum.lorem]' downloadUrl='http://ylai.edit.america.dev/wp-content/uploads/sites/2/2017/12/COE_s-dWsAAJp3S.mp4' specs='Optimized for file size (480x270 | 377 kB/s | 5 MB)' />
            <EmbedVideo label='Medium' embedcode='[loremipsum.lipsum.lorem]' downloadUrl='http://ylai.edit.america.dev/wp-content/uploads/sites/2/2017/12/COE_s-dWsAAJp3S.mp4' specs='Optimized for file size (480x270 | 377 kB/s | 5 MB)' />
            <EmbedVideo label='Large' embedcode='[loremipsum.lipsum.lorem]' downloadUrl='http://ylai.edit.america.dev/wp-content/uploads/sites/2/2017/12/COE_s-dWsAAJp3S.mp4' specs='Optimized for file size (480x270 | 377 kB/s | 5 MB)' />
        	</PopupContentItem>
        	
        	<PopupContentItem 
        	  domProps={{ className: 'popupElem_content_item', 'data-content': '3' }}
        	  headline='Download additional assets including SRT files and transcripts for this video. Download will include assets in all available languages.'
        	>
        	  <EmbedVideo label='SRTs' embedcode='[loremipsum.lipsum.lorem]' downloadUrl='http://ylai.edit.america.dev/wp-content/uploads/sites/2/2017/12/COE_s-dWsAAJp3S.mp4' specs='Subtitle files in available languages (1 MB)' />
            <EmbedVideo label='Transcripts' embedcode='[loremipsum.lipsum.lorem]' downloadUrl='http://ylai.edit.america.dev/wp-content/uploads/sites/2/2017/12/COE_s-dWsAAJp3S.mp4' specs='Transcript files in available languages (2 MB)' />
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

export default DownloadPopupItem;