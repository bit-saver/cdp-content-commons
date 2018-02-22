import React, { Component } from 'react';

class PopupContent extends Component {
  render() {
    return(
      <div className='downloadPopup_content'>
      	{this.props.children}
      </div>
    );
  }
}

export default PopupContent;