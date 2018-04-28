const {mlabURI} = require('./config/keys');
const express = require('express');
const app = express();

// Connect mongoose with mlab link:
const mongoose = require('mongoose');
mongoose.connect(mlabURI);

const AuthController = require('./controllers/AuthController');
// connect router in AuthController with prefix '/api/auth':
app.use('/api/auth', AuthController);

module.exports = app;
