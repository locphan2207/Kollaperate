const app = require('./app');

const PORT = process.env.PORT || 4000; // dynamic PORT binding

const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
