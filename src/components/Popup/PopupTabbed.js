import React, { Component } from 'react';
import { string, array, object } from 'prop-types';
import { Header, Tab } from 'semantic-ui-react';
import './Popup.css';

class PopupTabbed extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      sliderStyle: {
        width: this.props.config.width,
        left: this.props.config.offset
      },
      panes: this.props.panes.map( pane => ( {
        menuItem: pane.title,
        render: () => <Tab.Pane attached={ false }>{ pane.component }</Tab.Pane>
      } ) )
    };
  }

  handleOnTabChange = ( e ) => {
    this.setState( {
      sliderStyle: {
        width: e.target.clientWidth,
        left: e.target.offsetLeft
      }
    } );
  };

  render() {
    return (
      <div>
        <Header as="h2">{ this.props.title }</Header>
        <div className="slider" style={ this.state.sliderStyle } />
        <Tab menu={ { secondary: true } } panes={ this.state.panes } onTabChange={ this.handleOnTabChange } />
      </div>
    );
  }
}

PopupTabbed.propTypes = {
  panes: array,
  config: object,
  title: string
};

export default PopupTabbed;
