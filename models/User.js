const mongoose = require('mongoose');

// Create new mongoose schema:
const UserSchema = new mongoose.Schema({
  username: {type: String, unique: true, index: true},
  email: String,
  passwordDigest: String
});

// Create new model from the created schema:
// With model, you can use built-in methods like create, read, update, delete (CRUD)
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User'); // export to use in controller
