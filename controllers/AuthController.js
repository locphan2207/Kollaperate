const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');

const User = require('../models/User');

const router = express.Router(); // Create router instance from express with express version 4.0

// The body-parser module is used as a middleware to handle data in a more elegant way.
// This will come in handy when sending data through HTTP requests using forms.
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// -----
// Auth Routers:
// POST /api/auth/signup -> create new user
// POST /api/auth/current_user -> get current user info
// DELETE /api/auth/login -> create a login session
// DELETE /api/auth/logout -> delete a login session
// ----

router.post('/signup', (req, res) => {
  // Hasing the password to store in db:
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  // Create new user object:
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    passwordDigest: hashedPassword
  };

  // Create and save new user record into database:
  User.create(newUser, (err, user) => {
    // If there is error, send back response with error status:
    if (err) return res.status(500).send('There is problem in creating new user');

    // If no error, we create jwt token:
    const token = jwt.sign({id: user._id}, keys.secretKey, {
      expiresIn: 86400 // 24 hour
    });
    // Then send response back:
    res.status(200).send({auth: true, token: true});
  });
});

router.post('/login', (req, res) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if (err) return res.status(500).send('Login error');
    if (!user) return res.status(404).send('Email is not found');
    console.log(user);
    // compare the input password with the hash stored in db of the found user:
    const isValidPassword = bcrypt.compareSync(req.body.password, user.passwordDigest);

    if (!isValidPassword) return res.status(401).send({auth: false, token: null});

    // When password is correct:
    const token = jwt.sign({id: user._id}, keys.secretKey, {
      expiresIn: 86400
    });

    res.status(200).send({auth: true, token: true});
  });
});

module.exports = router;
