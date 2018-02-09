import React, { Component } from 'react';
import { connect } from 'react-redux';

class Notification extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const displayNotification = this.props.notification.open ? 'block' : 'none';
    return (
      <div className={`Notification__component ${this.props.notification.type}`} style={{ display: displayNotification }}>
        {this.props.notification.message}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notification: state.notification,
});

export default connect(mapStateToProps)(Notification);
