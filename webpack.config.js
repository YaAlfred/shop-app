var path    = require('path');
var webpack = require('webpack');

const PUBLIC_PATH = 'http://localhost:8080/';

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    filename: "index_bundle.js",
    path: path.join(__dirname + '/public'),
    publicPath : PUBLIC_PATH
  },
  devServer: {
    contentBase: './public'
  },
  watch   : true,
  module  : {
    loaders: [{
      test    : /\.js$/,
      loaders : ['babel-loader?' +
        'presets[]=es2015,' +
        'presets[]=react'],
      exclude : [/node_modules/],
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": 'jquery'
    })
  ]
};
