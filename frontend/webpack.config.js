const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public', 'js'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.js?$/], // /\.(js|jsx)$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['env', 'react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  mode: 'development'
};
