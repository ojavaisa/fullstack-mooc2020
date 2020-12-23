const totalLikes = (blogs) => {

  return blogs.map(blog => blog.likes).reduce((sum, item) => sum + item, 0);
};

const favoriteBlog = (blogs) => { //return blog with most likes, returns empty object if receives empty list

  return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current, {});
};

module.exports = {
  totalLikes,
  favoriteBlog
};