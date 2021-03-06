let webpack = require('webpack');
let path = require('path');
module.exports = {
  target: 'electron-renderer',
  entry:__dirname + '/app/renderer.js',
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
      },
      {
        test:/\.css$/,
        loader:['style-loader','css-loader']
      },
      {
        test:/\.(ttf|eot|woff|woff2|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'public/fonts/'
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules']
  },
};
