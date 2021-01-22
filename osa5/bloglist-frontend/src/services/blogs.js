import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async newBlogObject => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlogObject, config);
  return response.data;
};

const addLike = async (blogObject) => {
  const url = `${baseUrl}/${blogObject.id}`;

  const updatedBlog = {
    title: blogObject.title,
    author: blogObject.author,
    url: blogObject.url,
    likes: blogObject.likes + 1,
    user: blogObject.user._id
  };

  const response = await axios.put(url, updatedBlog);
  return response.data;   //updated blog is returned as response
};

export default { getAll, setToken, create, addLike };