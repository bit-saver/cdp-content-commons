import React, { Component } from 'react';

class Hover extends Component {  
  render() {
  	return(
  	  <div className={this.props.className}>
        <p>{this.props.content}</p>
      </div>
  	);
  }	
}

export default Hover;