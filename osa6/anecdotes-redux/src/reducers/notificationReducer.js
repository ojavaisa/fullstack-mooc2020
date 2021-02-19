const notification = 'Kukkuu'

const notificationReducer = (state = notification, action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return state;
    default:
      return state;
  }
};

export default notificationReducer;