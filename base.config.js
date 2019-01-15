const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const WebpackAutoInject = require('webpack-auto-inject-version');

module.exports = {
  
  plugins: [
    new WebpackAutoInject({
      // specify the name of the tag in the outputed files eg
      // bundle.js: [SHORT]  Version: 0.13.36 ...
      SHORT: 'BUILD',
      SILENT: false,
      PACKAGE_JSON_PATH: './package.json',
      components: {
        AutoIncreaseVersion: true,
        InjectAsComment: true,
        InjectByTag: true
      },
      componentsOptions: {
        AutoIncreaseVersion: {
          runInWatchMode: false // it will increase version with every single build!
        },
        InjectAsComment: {
          tag: 'Version: {version} - {date}',
          dateFormat: 'dddd, mmmm dS, yyyy, h:MM:ss TT'
        },
        InjectByTag: {
          fileRegex: /\.+/,
          // regexp to find [AIV] tag inside html, if you tag contains unallowed characters you can adjust the regex
          // but also you can change [AIV] tag to anything you want
          AIVTagRegexp: /(\[AIV])(([a-zA-Z{} ,:;!()_@\-"'\\\/])+)(\[\/AIV])/g,
          dateFormat: 'dddd, mmmm dS, yyyy, h:MM:ss TT'
        }
      },
      LOGS_TEXT: {
        AIS_START: 'DEMO AIV started'
      }
    }),
    //clean dist before each build
    new CleanWebpackPlugin(['dist']),
   
    new ExtractTextPlugin({
        filename:'[name].css'
    }),
  
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    

  ],
  optimization: {
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendor",
                chunks: "all"
            }
        }
    }
},
  

};