import React, { useState } from 'react';

const Blog = ({ blog, addLike }) => {
  const [viewFull, setViewFull] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 10
  };

  //const hideWhenVisible = { display: visible ? 'none' : '' };
  const showFullInfo = { display: viewFull ? '' : 'none' };

  const toggleFullView = () => {
    setViewFull(!viewFull);
  };

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} - {blog.author} <button onClick={toggleFullView}>{viewFull ? 'Hide' : 'View'}</button>
      </div>
      <div style={showFullInfo} className='blogFullInfo'>
        <div>Site: {blog.url}</div>
        <div>Likes {blog.likes} <button onClick={addLike}>Like</button></div>
        <div>Added by: {blog.user.name}</div>
      </div>
    </div>
  );
};

export default Blog;
