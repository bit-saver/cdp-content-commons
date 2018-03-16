import React, { Component } from 'react';
import { Header, Tab } from 'semantic-ui-react';
import VideoClosedCaptions from './VideoClosedCaptions';
import VideoOpenCaptions from './VideoOpenCaptions';
import './PopupElem.css';

class PopupVideoDownload extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      sliderStyle: {
        width: '142px',
        left: '84px'
      }
    };
  }

  panes = [
    {
      menuItem: 'Closed Captions',
      render: () => (
        <Tab.Pane attached={ false }>
          <VideoClosedCaptions />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Open Captions',
      render: () => (
        <Tab.Pane attached={ false }>
          <VideoOpenCaptions />
        </Tab.Pane>
      )
    },
    { menuItem: 'More', render: () => <Tab.Pane attached={ false }>Tab 3 Content</Tab.Pane> },
    { menuItem: 'Help', render: () => <Tab.Pane attached={ false }>Tab 4 Content</Tab.Pane> }
  ];

  handleOnClick = ( e ) => {
    // only update if <a> tag is clicked
    if ( e.target.tagName === 'A' ) {
      this.setState( {
        sliderStyle: {
          width: e.target.clientWidth,
          left: e.target.offsetLeft
        }
      } );
    }
  };

  render() {
    return (
      <div>
        <Header as="h2">Download this video</Header>
        <div className="slider" style={ this.state.sliderStyle } />
        <Tab menu={ { secondary: true } } panes={ this.panes } onClick={ this.handleOnClick } />
      </div>
    );
  }
}

export default PopupVideoDownload;
