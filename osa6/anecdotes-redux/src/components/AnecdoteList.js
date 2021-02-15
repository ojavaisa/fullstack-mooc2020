import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';

// const Anecdote = ({ anecdote, handleClick }) => {
//   return(
//     <li 
//   )
// }

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state);

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => 
              dispatch(voteAnecdote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
};

export default AnecdoteList;