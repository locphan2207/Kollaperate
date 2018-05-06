const {mlabURI} = require('./config/keys');
const express = require('express');
const app = express();

// Connect mongoose with mlab link:
const mongoose = require('mongoose');
mongoose.connect(mlabURI);

const AuthController = require('./controllers/AuthController');
// connect router in AuthController with prefix '/api/auth':
app.use('/api/auth', AuthController);

// Set up frontend server with same port by leading the server to static public folder:
// So that for every routes that does not start with '/api' it will go to frontend route
app.use(express.static('frontend/public'));

const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'public', 'index.html'));
});

module.exports = app;
