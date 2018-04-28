# Note:
### Set up Node/Express server:
- `npm init`
- `npm install --save express`
- `npm install --save-dev nodemon` (for auto reload server)
- add new script `"start": "nodemon index"`
- create new index.js file:

```javascript
var express = require('express');

var app = express();

var server = app.listen(4000, () => {
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
