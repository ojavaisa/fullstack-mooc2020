var timeoutID;

export const showNotification = (message, time) => {
  return async dispatch => {
    //if a previous timeout exists, clear it, so there is no premature message clear for second notification
    if (typeof timeoutID === 'number'){
      clearTimeout(timeoutID);
    }
    await dispatch({
      type: 'SET_NOTIFICATION',
      msg: message
    });
    timeoutID = setTimeout(() => {
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