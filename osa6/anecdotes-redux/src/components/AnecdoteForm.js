import React from 'react';
//import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    // dispatch(createAnecdote(content));
    // dispatch(showNotification(`created new anecdote '${content}'`, 5));
    props.createAnecdote(content);
    props.showNotification(`created new anecdote '${content}'`, 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  createAnecdote,
  showNotification
};

//export default AnecdoteForm;
export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);