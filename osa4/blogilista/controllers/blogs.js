const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {  //next no longer required, thanks to express-async-errors
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) { //if there is no token (extracted in middleware) or decoded token object doesn't contain id return error
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);  //id saved in login controller is the db assigned id object

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user
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
  const blog = await Blog.findById(request.params.id);

  //verify token of request sender
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) { //if there is no token (extracted in middleware) or decoded token object doesn't contain id return error
    return response.status(401).json({ error: 'token missing or invalid' });
  } else if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    return response.status(204).end();
  } else {
    return response.status(401).json({ error: 'wrong user' });
  }

});

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body;

  // const blog = {
  //   likes: body.likes,
  // };

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1 });
  response.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;