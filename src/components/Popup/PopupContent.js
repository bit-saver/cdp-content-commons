import React, { Component } from 'react';

class PopupContent extends Component {
  render() {
    return(
      <div className='popupElem_content'>
      	{this.props.children}
      </div>
    );
  }
}

export default PopupContent;