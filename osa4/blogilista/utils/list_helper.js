var _ = require('lodash');  //more verstile collection handling functions

const totalLikes = (blogs) => {

  return blogs.map(blog => blog.likes).reduce((sum, item) => sum + item, 0);
};

const favoriteBlog = (blogs) => { //return blog with most likes, returns empty object if receives empty list

  return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current, {});
};

const mostBlogs = (blogs) => {
  if(blogs.length === 0) {
    return {};
  }
  const blogCounts = _.countBy(blogs, 'author');  //lodash: count objects by 'author' attribute, returns object that has author names as keys and counts as values
  const blogCountsObjs = _.map(blogCounts,
    (val, key) => ({ author: key, blogs: val }) );  //turn previous object into objects with author names and blogcounts
  return _.maxBy(blogCountsObjs, 'blogs');  //get maximum of previous objects by blog count
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs
};