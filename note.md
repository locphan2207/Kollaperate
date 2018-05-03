# Note:
### Set up Node/Express server:
- `npm init`
- `npm install --save express`
- `npm install --save-dev nodemon` (for auto reload server)
- add new script `"start": "nodemon index"`
- create new index.js file

```javascript
const express = require('express');
const app = express();
const server = app.listen(4000, () => {
  console.log("Server is running on 4000");
});
```

### Heroku:
- Dynamic PORT binding
- Let heroku know the node and npm version in package.json
- Set up start command to run server in package.json
- Use .gitignore node_modules

### Nodemon:
- npm install -g nodemon
- type `nodemon` in terminal to run server with continuous watching

### Mongoose.JS:
- Package that helps represent MongoDB record with Model Class
- Create a user to access the database.
- Copy the URI string into `mongoose.connect()`
```javascript
const mongoose = require('mongoose');
mongoose.connect(mlabURI);
```

### Middleware of express framework:
- Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.
- If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

### JSON Web Token (JWT)
- When a user login, we create a new JWT and send it to the client side.
```javascript
const token = jwt.sign({id: user._id}, keys.secretKey, {
  expiresIn: 86400 // 24 hour
});
```
- The client side store that JWT into localStorage in browser, whenever they make a request that requires user auth, we have to stick that JWT in header of the request under a key with name `x-access-token` (must be that exact key name)
- On server side, when receive the HTTP request with `x-access-token` in the header. We have to verify if that JWT is valid for this request. To do this, we set up a custom middleware to check if valid JWT. If it is, store the user id in the request header for the next middleware function:
```javascript
function verifyToken(req, res, next) {
  // Try to get token in request header:
  const token = req.headers['x-access-token'];
  // If no token:
  if (!token) return res.status(403).send({auth: false, message: 'No token'});

  // If token is found, verify with key:
  jwt.verify(token, keys.secretKey, (err, decoded) => {
    // In case of error:
    if (err) return res.status(500).send({auth: false, message: 'Failed to verify'});

    // Put the id after decoding into request object
    req.userId = decoded.id;

    // Go to the next middleware function
    next();
  });
}
```
- Call that middleware before we process the response of the HTTP cycle. If we find the userId in the request, we know the JWT is valid, so we can continue handling the request. If not, send error. For example, create a route to get info of current user like this:
```javascript
router.get('/current_user', verifyToken, (req, res) => {
  User.findById(req.userId, {password: 0}, (err, user) => {
    if (err) return res.status(500).send('Error in finding user info');
    if (!user) return res.status(404).send('Cannot find user info.');
    res.status(200).send(user);
  });
});
```
