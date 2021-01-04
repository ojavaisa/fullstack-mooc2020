var _ = require('lodash');  //more verstile collection handling functions

const totalLikes = (blogs) => {

  return blogs.map(blog => blog.likes).reduce((sum, item) => sum + item, 0);
};

const favoriteBlog = (blogs) => { //return blog with most likes, returns empty object if receives empty list

  return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current, {});
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const blogCounts = _.countBy(blogs, 'author');  //lodash: count objects by 'author' attribute, returns object that has author names as keys and counts as values
  const blogCountsObjs = _.map(blogCounts,
    (val, key) => ({ author: key, blogs: val }));  //turn previous object into { author, blogs } objects
  return _.maxBy(blogCountsObjs, 'blogs');  //get maximum of previous objects by blog count
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const groupedBlogs = _.groupBy(blogs, 'author');  //lodash: group objects by 'author' attribute, returns object that has author names as keys and list of blogs as values
  const likeCountsObjs = _.map(groupedBlogs,
    (val, key) => ({  //author name is key, list of blog objects is value
      author: key,
      likes: _.reduce(val, (likes, nextBlog) => likes + nextBlog.likes, 0)  //reduce list of blog objects to sum of likes, start counting from 0
    })  // result is list of { author, likes } objects
  );
  return _.maxBy(likeCountsObjs, 'likes');  //get maximum of previous objects by like count
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};