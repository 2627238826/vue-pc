const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const config = require('../config/env');
const devConfigJs = {
  mode: 'development',
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/
      // },
      // 处理css/scss/sass
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 使用vendor-manifest.json引用dll
    new webpack.DllReferencePlugin({
      // context：与Dllplugin里的context所指向的上下文保持一致，这里都是指向了根目录
      context: __dirname,
      manifest: require('./vendor-manifest.json')
    }),
    // 这个主要是将生成的vendor.dll.js文件加上hash值插入到页面中。
    new AddAssetHtmlPlugin([
      {
        // dll文件位置
        filepath: path.resolve(__dirname, '../static/js/vendor.dll.js'),
        // dll最终输出的目录
        outputPath: './js',
        // dll 引用路径
        publicPath: './js',
        includeSourcemap: false,
        hash: true
      }
    ]),
    new webpack.NamedModulesPlugin(), // 更方便查看patch的依赖
    new webpack.HotModuleReplacementPlugin() // HMR
  ],
  devServer: config.devServer
};

module.exports = merge(baseWebpackConfig, devConfigJs);
