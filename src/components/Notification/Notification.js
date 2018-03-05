import React from 'react';
import { shape, bool, string } from 'prop-types';
import { connect } from 'react-redux';

const Notification = ( props ) => {
  const displayNotification = props.notification.open ? 'block' : 'none';
  return (
    <div
      className={ `Notification__component ${props.notification.type}` }
      style={ { display: displayNotification } }
    >
      { this.props.notification.message }
    </div>
  );
};

const mapStateToProps = state => ( {
  notification: state.notification
} );

Notification.propTypes = {
  notification: shape( {
    open: bool,
    type: string
  } )
};

export default connect( mapStateToProps )( Notification );
