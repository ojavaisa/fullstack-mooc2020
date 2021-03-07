export const showNotification = (message, time) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      msg: message
    });
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      });
    }, time * 1000);
  };
};

// export const clearNotification = () => {
//   return {
//     type: 'CLEAR_NOTIFICATION'
//   }
// }

const notificationReducer = (state = '', action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.msg;
    case 'CLEAR_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

export default notificationReducer;