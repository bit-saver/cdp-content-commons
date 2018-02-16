import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';


class EmbedVideo extends Component {
  render() {
  	const { embedcode } = this.props;    

  	return(
      <div className='videoEmbed_wrapper'>
    	  <div className='videoEmbed'>
          <div className='videoEmbed_label_wrapper'>          
    	      <p className='videoEmbed_label'>{this.props.label}</p>
          </div>
    	  	<div className='videoEmbed_code'>
    	  	  <Input value={embedcode} disabled />
    	  	  <a href={this.props.downloadUrl} className='ui button primary' download>Download</a>          
    	  	</div>        
    	  </div>
        <span className='videoEmbed_specs'>{this.props.specs}</span>
      </div>
  	);
  }
}

export default EmbedVideo;