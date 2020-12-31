const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const body = request.body;

  const user = await User.findOne({ username: body.username });
  const passwordCorrect = user === null //if user is null
    ? false                             // set pwdCorrect to false as well
    : await bcrypt.compare(body.password, user.passwordHash); //otherwise compare entered password to pwdhash of the one in db

  if (!(user && passwordCorrect)) { //if both from above are not true, return error
    return response.status(401).json({  //'Unauthorized'
      error: 'invalid username or password'
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id, //NOTE: using db assigned id (object)
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  //generate token for user, environment variable SECRET ensures that only systems with it can sign a token

  response.status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;