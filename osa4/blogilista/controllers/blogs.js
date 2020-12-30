const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {  //next no longer required, thanks to express-async-errors
  const body = request.body;

  const users = await User.find({});
  const user = users[0];

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
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

  user.blogs = user.blogs.concat(savedBlog._id);  //save blog to users array of blogs as well
  await user.save();

  response.json(savedBlog.toJSON());
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;