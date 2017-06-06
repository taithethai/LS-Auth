const models = require('../models');
const requireSignIn = require('../services/passport').requireSignIn;
const getTokenForUser = require('../services/token');

const signUp = (req, res) => {
  // create a new user and return a valid JWT token to the client
  const user = new models.User(req.body);
  user.save((err, user) => {
    if (err) return res.send(err);
    res.send({
      token: getTokenForUser(user),
    });
  });
};

const signIn = (req, res) => {
  // generate a JWT token if the username/password is valid
    res.send({ token: getTokenForUser(req.user) });
};

module.exports = (app) => {
  app.post('/signup', signUp);
  app.post('/signin', requireSignIn, signIn);
};
