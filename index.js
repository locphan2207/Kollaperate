const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({Test: 'This is a test'});
});

const PORT = process.env.PORT || 4000; // dynamic PORT binding

const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
