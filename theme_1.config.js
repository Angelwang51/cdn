const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    theme_default:['./assets/theme_default/js/theme_default.js'],
    theme_1:['./assets/theme_1/js/theme_1.js']
  }, 
  plugins: [
    //clean dist before each build
    new CleanWebpackPlugin(['dist']),
    //
    new HtmlWebpackPlugin({
        myOptions:{
            title: 'theme_1',
            logo_src: 'img/logo.png'
        },
        template:'templates/base.html',
        inject: true         
        }),
        
    new ExtractTextPlugin({
        filename:'[name].css'
    }),
    //copy images from assets folder to dist
    new CopyWebpackPlugin([
      {from:'assets/theme_1/img',to:'img'} 
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
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
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist/theme_1')
  },
  module: {
    rules: [
    {
      test: /\.(s*)css$/, 
      use: ExtractTextPlugin.extract({ 
        fallback:'style-loader',
        use:['css-loader','sass-loader']
      })
    },
    //load HTML with nunjucks-isomorphic-loader
    {
      test: /\.html$/,
      use: [
        {
          loader: 'nunjucks-isomorphic-loader',
          query: {
            root: [path.resolve(__dirname, 'templates')]
            
          }
        }
      ]
    } 
  ]
}
};