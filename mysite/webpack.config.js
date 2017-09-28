const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
// const HtmlWebpackPlugin = require('html-webpack-plugin');//used to generate an html with script pointing to bundle

module.exports = {
  // meaning of entry
  //   // 'react-hot-loader/patch',
  //   // activate HMR for React

  //   'webpack-dev-server/client?http://localhost:3000',
  //   // bundle the client for webpack-dev-server
  //   // and connect to the provided endpoint

  //   'webpack/hot/only-dev-server',
  //   // bundle the client for hot reloading
  //   // only- means to only hot reload for successful updates

  //   path.resolve(__dirname, './assets/app'),
  //   // the entry point of our app
  entry: {
    //try  to maintain the same schema for entry and thus provide the same webpack-stats[-prod]
    vendor: ['react', 'react-dom'], //no need to actually create the vendor entry dir
    app1: ['./assets/src/app1', 'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:3000'],
    app2: ['./assets/src/app2', 'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:3000'],
  },
  output: {
    path: path.resolve(__dirname, './assets/bundles'),
    filename: '[name].bundle.js',
    publicPath: 'http://localhost:3000/assets/bundles/',
    // override django's STATIC_URL & for webpack loader
    // the trick here is the publicPath is exactly the url(domain & port included!) of the WDS

    // necessary for HMR to know where to load the hot update chunks
  },
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
    // //https://stackoverflow.com/questions/39548175/can-someone-explain-webpacks-commonschunkplugin/39600793
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
      // if the below function is used, then only the vendor in node_modules will be extracted
      // however, it also means hot loader related code in each app will be extracted, not sure if this is desired
      // minChunks: function (module) {
      //   // this assumes your vendor imports exist in the node_modules directory
      //   return module.context && module.context.indexOf("node_modules") !== -1;
      // }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity,
    }),

    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors
  
    new BundleTracker({filename: './webpack-stats.json'}),
    //generate webpack-stats.json for django-webpack-loader
  ],
  devServer: {
    host: 'localhost',
    port: 3000,

    historyApiFallback: true,
    // respond to 404s with index.html...that's it. all the explanation online fail to provide such a succinct idea
    
    hot: true,
    // enable HMR on the server

    //CORS
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:8000",
      // or simply "Access-Control-Allow-Origin": "*" 
    },
    /*
    whether you need Access Control depends on:
    1. you dont need this if your index.html is served by the same WDS, which serves the bundles & HMR
       In this case, the frontend code fetch the HMR json from the same server and thus no CORS problem
    2. you need this if your frontend code is served by another server(e.g. Django) 
       you need to allow HMR runtime to get updated HMR json through HTTP from this WDS
       (which is in another domain, their ports are different)
       http://andrewhfarmer.com/understanding-hmr/
    */

    // proxy: {}
    /*
    whether you need proxy depends on:
    1. If your frontend code(which make the ajax) is served by
       this WDS, and it makes ajax call to an external api,
       e.g. xxx/api/jsondata
       then you (might)need to proxy the api call here due to CORS.

    2. If you frontend is served by the server which also serve the api data
      (e.g. Django for index.html && api data)
       then you dont need to worry about this
    */  
  },
};

