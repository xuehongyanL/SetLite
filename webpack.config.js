let webpack = require('webpack');
let path = require('path');
module.exports = {
  target: 'electron-renderer',
  entry:__dirname+'/app/renderer.js',
  output: {
    path: __dirname,
    filename: './app/bundle.js'
  },
  module: {
    rules:  [
      {
        test:/\.js$/,
        exclude:'/node_modules/',
        loader:'babel-loader',
        options:{
          presets:['@babel/preset-react', '@babel/preset-env'],
          plugins:['@babel/plugin-proposal-class-properties'],
          compact: false
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules']
  },
};
