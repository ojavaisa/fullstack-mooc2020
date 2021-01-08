import React from 'react';

const BlogForm = ({ addBlog, newTitle, handleTitleChange, newAuthor, handleAuthorChange, newUrl, handleUrlChange }) => (
  <form onSubmit={addBlog}>
    <div>Title: <input value={newTitle} onChange={handleTitleChange} /></div>
    <div>Author: <input value={newAuthor} onChange={handleAuthorChange} /></div>
    <div>Url: <input value={newUrl} onChange={handleUrlChange} /></div>
    <div><button type="submit">Create</button></div>
  </form>
);

export default BlogForm;