import * as t from './types';

export const closeNotification = () => ({
  type: t.CLOSE_NOTIFICATION,
});

export const showNotification = (notification) => {
  return async (forceDispatch, getState) => {
    forceDispatch({
      type: t.SHOW_NOTIFICATION,
      payload: notification
    });

    let timer = setTimeout(() => {
      forceDispatch(closeNotification());
      clearTimeout(timer);
    }, 4000);
  };
};
