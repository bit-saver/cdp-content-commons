import * as t from './types';

export const closeNotification = () => ( {
  type: t.CLOSE_NOTIFICATION
} );

export const showNotification = notification => async ( forceDispatch ) => {
  forceDispatch( {
    type: t.SHOW_NOTIFICATION,
    payload: notification
  } );

  const timer = setTimeout( () => {
    forceDispatch( closeNotification() );
    clearTimeout( timer );
  }, 4000 );
};
