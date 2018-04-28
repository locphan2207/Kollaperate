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
// RESTful Routers:
// POST /api/users -> create new user
// POST /api/session -> create a login session
// DELETE /api/session -> delete a login session
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

})

module.exports = router;
