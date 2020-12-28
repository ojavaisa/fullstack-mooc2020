const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {  //next no longer required, thanks to express-async-errors
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  });

  //implementation with promises:
  /* blog.save()
    .then(result => {
      response.status(201).json(result.toJSON());
    })
    .catch(error => next(error)); */

  //implementation with async/await, but error handling with try-catch:
  /* try {
    const savedBlog = await blog.save();
    response.json(savedBlog.toJSON());
  } catch(exception) {
    next(exception);
  } */

  //implementation with express-async-errors library
  const savedBlog = await blog.save();
  response.json(savedBlog.toJSON());
});

module.exports = blogsRouter;