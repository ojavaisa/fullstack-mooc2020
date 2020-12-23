const config = require('./utils/config'); //configuration things, db url etc.
const express = require('express');
const app = express();
const cors = require('cors'); //enables cross origin resources, if frontend and backend need to be run in different ports
const blogsRouter = require('./controllers/blogs'); //module for resolving routes
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

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;