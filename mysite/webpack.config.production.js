const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

//https://github.com/webpack/webpack/issues/2121
process.env.NODE_ENV = 'production'; //for babel

module.exports = {
  entry: {
    vendor: ['react', 'react-dom'], //still required? since we use function for minChunks
    app1: './assets/src/app1',
    app2: './assets/src/app2',
  },
  output: {
    path: path.resolve(__dirname, './assets/dist'),
    filename: '[name].js',
    // publicPath: '/static/dist/', 
    //static/dist/ is the root for dist files during django development
    //for potential code splitting, https://stackoverflow.com/questions/28846814/what-does-publicpath-in-webpack-do
  },
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
        ],
        include: path.resolve(__dirname, './assets/src'),
      },
    ],
  },
  plugins: [
    //generate webpack-stats-prod.json for django-webpack-loader
    new BundleTracker({filename: './webpack-stats-prod.json'}),
    
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function(module){
        return module.context && module.context.indexOf("node_modules") !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),

    // removes a lot of debugging code in React && set babel env
    new webpack.DefinePlugin({
      'process.env': {
        //this does not affect babel, but would affect react
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    // // minifies your code
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    }),
  ],
};


