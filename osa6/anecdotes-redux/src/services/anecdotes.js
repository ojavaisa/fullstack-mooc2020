import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const voteAnecdote = async (id) => {
  let response = await axios.get(`${baseUrl}/${id}`);
  const anecdoteToChange = response.data;
  const updatedAnecdote = {
    ...anecdoteToChange,
    votes: anecdoteToChange.votes + 1
  };
  response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);  //palauttiks tää sen vanhan?
  return response.data;
};

export default { getAll, createNew, voteAnecdote };