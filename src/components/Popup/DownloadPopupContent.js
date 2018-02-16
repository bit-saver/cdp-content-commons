import React, { Component } from 'react';
import PopupContentItem from './DownloadPopupContentItem';
import EmbedVideo from '../Embed/EmbedVideo';

class PopupContent extends Component {
  render() {
    return(
      <div className='downloadPopup_content'>
      	<PopupContentItem 
      	  domProps={{ className: 'downloadPopup_content_item downloadPopup_content_item--show', 'data-content': '1' }}
      	  headline='Download this video with the closed captions in the language selected. This download option is best for uploading this video to web pages.'
      	>
      	  <EmbedVideo label='Small' embedcode='[loremipsum.lipsum.lorem]' downloadUrl='http://ylai.edit.america.dev/wp-content/uploads/sites/2/2017/12/COE_s-dWsAAJp3S.mp4' specs='Optimized for file size (480x270 | 377 kB/s | 5 MB)' />
          <EmbedVideo label='Medium' embedcode='[loremipsum.lipsum.lorem]' downloadUrl='http://ylai.edit.america.dev/wp-content/uploads/sites/2/2017/12/COE_s-dWsAAJp3S.mp4' specs='Optimized for file size (480x270 | 377 kB/s | 5 MB)' />
          <EmbedVideo label='Large' embedcode='[loremipsum.lipsum.lorem]' downloadUrl='http://ylai.edit.america.dev/wp-content/uploads/sites/2/2017/12/COE_s-dWsAAJp3S.mp4' specs='Optimized for file size (480x270 | 377 kB/s | 5 MB)' />
      	</PopupContentItem>
      	
      	<PopupContentItem 
      	  domProps={{ className: 'downloadPopup_content_item', 'data-content': '2' }}
      	  headline='Download this video with open captions in the language selected. This download option is best for uploading this video to social media.'
      	>
      	  <EmbedVideo label='Small' embedcode='[loremipsum.lipsum.lorem]' downloadUrl='http://ylai.edit.america.dev/wp-content/uploads/sites/2/2017/12/COE_s-dWsAAJp3S.mp4' specs='Optimized for file size (480x270 | 377 kB/s | 5 MB)' />
          <EmbedVideo label='Medium' embedcode='[loremipsum.lipsum.lorem]' downloadUrl='http://ylai.edit.america.dev/wp-content/uploads/sites/2/2017/12/COE_s-dWsAAJp3S.mp4' specs='Optimized for file size (480x270 | 377 kB/s | 5 MB)' />
          <EmbedVideo label='Large' embedcode='[loremipsum.lipsum.lorem]' downloadUrl='http://ylai.edit.america.dev/wp-content/uploads/sites/2/2017/12/COE_s-dWsAAJp3S.mp4' specs='Optimized for file size (480x270 | 377 kB/s | 5 MB)' />
      	</PopupContentItem>
      	
      	<PopupContentItem 
      	  domProps={{ className: 'downloadPopup_content_item', 'data-content': '3' }}
      	  headline='Download additional assets including SRT files and transcripts for this video. Download will include assets in all available languages.'
      	>
      	  <EmbedVideo label='SRTs' embedcode='[loremipsum.lipsum.lorem]' downloadUrl='http://ylai.edit.america.dev/wp-content/uploads/sites/2/2017/12/COE_s-dWsAAJp3S.mp4' specs='Subtitle files in available languages (1 MB)' />
          <EmbedVideo label='Transcripts' embedcode='[loremipsum.lipsum.lorem]' downloadUrl='http://ylai.edit.america.dev/wp-content/uploads/sites/2/2017/12/COE_s-dWsAAJp3S.mp4' specs='Transcript files in available languages (2 MB)' />
      	</PopupContentItem>
      	
      	<PopupContentItem domProps={{ className: 'downloadPopup_content_item', 'data-content': '4' }} >
      	  <p>I don't see what I'm lookg for...(link to Dev Tools)</p>
      	  <p>Whay can't I use an open captions file for social media?</p>      	  
      	</PopupContentItem>
      </div>
    );
  }
}

export default PopupContent;