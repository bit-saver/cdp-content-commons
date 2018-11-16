import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { Icon } from 'semantic-ui-react';

import { connect } from 'react-redux';
import * as actions from '../../actions';

import './Alert.css';

/**
 * Creates a red notification bar below the header when the user is detected
 * to be on an OpenNet IP using IE or Edge. Could be modified to display any message
 * that could be show as an alert in future.
 */
class Alert extends Component {
  componentDidMount() {
    this.props.loadAlert();
  }

  shouldComponentUpdate( nextProps ) {
    return this.props.alert.isOpenNet !== nextProps.alert.isOpenNet ||
      this.props.alert.isClosed !== nextProps.alert.isClosed;
  }

  handleClose = ( e ) => {
    e.preventDefault();
    this.props.closeAlert();
  };

  render() {
    if ( !this.props.alert.showAlert ) return null;
    return (
      <div className="alert-bar">
        OpenNet users: please use Chrome for the best Content Commons experience.
        <Icon name="close" link="true" onClick={ this.handleClose } className="close" />
      </div>
    );
  }
}

const mapStateToProps = state => ( {
  alert: state.alert
} );

Alert.propTypes = {
  loadAlert: func,
  closeAlert: func,
  alert: object
};

export default connect( mapStateToProps, actions )( Alert );
