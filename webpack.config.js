var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, ""),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/main.js",
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-0'],
        plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
      }
    }]
  },
  output: {
    path: __dirname + "/dist/js",
    filename: "scripts.min.js",
    publicPath: '/dist/js/'
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
  devServer: {
    contentBase: './dist', //Relative directory for base of server
    devtool: 'eval',
    hot: true, //Live-reload
    inline: true,
    port: 5858, //Port Number
    host: '0.0.0.0', //Change to '0.0.0.0' for external facing server
    // proxy: {
    //   '^\/users|sitters|bookings': {
    //     target: 'http://127.0.0.1:3001',
    //     rewrite: function(req) {
    //       req.url = req.url.replace(/^\/api/, '');
    //     }
    //   }
    // },
    historyApiFallback: true
  },
};
