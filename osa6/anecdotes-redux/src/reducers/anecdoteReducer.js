import anecdoteService from '../services/anecdotes';

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    dispatch({
      type: 'INIT_ANECDOTES',
      data: sortedAnecdotes
    });
  };
};

export const voteAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.voteAnecdote(id);
    dispatch({
      type: 'VOTE',
      data: id
    })
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'VOTE':
      const id = action.data;
      const anecdoteToChange = state.find(a => a.id === id);
      //const otherAnecdotes = state.filter(a => a.id !== id)
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