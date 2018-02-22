import React, { Component } from 'react';

class PopupContentItem extends Component {
  render() {
  	const { domProps, headline } = this.props;

  	return(
  	  <div {...domProps}>
  	  	<p className='popupElem_content_info'>{headline}</p>
  	  	{this.props.children}
  	  </div>	
  	);
  }
}

export default PopupContentItem;