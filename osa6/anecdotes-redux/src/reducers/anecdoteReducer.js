
const getId = () => (1000000 * Math.random()).toFixed(0);

/*const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
}; */

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  };
};

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  };
};

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content: content,
      id: getId(),
      votes: 0
    }
  };
};

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToChange = state.find(a => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };
      const newState = state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
      return newState.sort((a, b) => b.votes - a.votes);
    case 'NEW_ANECDOTE':
      return state.concat(action.data);
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export default anecdoteReducer;