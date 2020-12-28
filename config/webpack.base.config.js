const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ['@babel/polyfill', path.resolve(__dirname, '../src/index.tsx')],
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.ts(x?)$/,
            use: [
                {
                  loader: 'babel-loader',
                  options: {
                      exclude: ['node_modules'],
                      cacheDirectory: true,
                  },
                },
                {
                  loader: 'thread-loader',
                  // 有同样配置的 loader 会共享一个 worker 池(worker pool)
                  options: {
                    // 产生的 worker 的数量，默认是 cpu 的核心数
                    workers: 4,
                  },
                },
            ],
          },
          {
            test: /\.(less|css)$/,
            use: [
              { loader: 'style-loader' },
              {
                  loader: 'css-loader',
                  options: {
                      importLoaders: 1,
                  },
              },
              {
                  loader: 'less-loader',
                  options: {
                    lessOptions: { // https://webpack.docschina.org/loaders/less-loader/
                      modifyVars: {
                          hack: `true; @import "${path.resolve(
                              __dirname,
                              '../src/assets/less/antd/index.less'
                          )}";`,
                      },
                      javascriptEnabled: true,
                    }
                  },
              },
            ],
          },
          {
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            type: 'asset/resource', // https://webpack.docschina.org/guides/asset-management/
          },
        ]
      }
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    }
  },
};