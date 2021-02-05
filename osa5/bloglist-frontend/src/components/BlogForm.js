import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    });

    setNewBlogTitle('');
    setNewBlogAuthor('');
    setNewBlogUrl('');

  };

  return (
    <div>
      <h2>Add a new blog</h2>

      <form onSubmit={addBlog}>
        <div>Title: <input id="title" value={newBlogTitle} onChange={handleTitleChange} /></div>
        <div>Author: <input id="author" value={newBlogAuthor} onChange={handleAuthorChange} /></div>
        <div>Url: <input id="url" value={newBlogUrl} onChange={handleUrlChange} /></div>
        <div><button id="submit-button" type="submit">Save</button></div>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
};

export default BlogForm;