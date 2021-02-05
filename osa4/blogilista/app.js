const config = require('./utils/config'); //configuration things, db url etc.
const express = require('express');
require('express-async-errors'); //pass errors from async functions automatically to errorhandling middleware, no need for try-catch
const app = express();
const cors = require('cors'); //enables cross origin resources, if frontend and backend need to be run in different ports
const blogsRouter = require('./controllers/blogs'); //module for resolving routes (for blogs)
const usersRouter = require('./controllers/users');  //module for handling users
const loginRouter = require('./controllers/login'); //module for hanling routes for login
const middleware = require('./utils/middleware'); //module of custom made middlewares
const mongoose = require('mongoose'); //MongoDB utility
const logger = require('./utils/logger'); //module for console logging

const mongoUrl = config.MONGODB_URI;

logger.info('connecting to', mongoUrl);
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
//app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use(middleware.tokenExtractor);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;