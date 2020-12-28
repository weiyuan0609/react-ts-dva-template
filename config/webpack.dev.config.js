const { merge } = require('webpack-merge');
const base_config = require('./webpack.base.config');
const proxyConfig = require('./proxyConfig');
const path = require('path');
const webpack = require('webpack');
const { argv } = require('yargs');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

// 本地开发环境配置，默认 dev1 环境
const env = argv.env || 'dev1';
const config = proxyConfig[env];

const dev_config = {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../'),
        open: true,
        port: config.port,
        hot: true,
        https: true,
        host: 'pb-sp-test-dev.myysq.com.cn',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        historyApiFallback: true,
        proxy: {
          '/api': {
              target: config.target,
              changeOrigin: true,
              pathRewrite: {
                  '^/api': '',
              },
          },
        },
        disableHostCheck: true,
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            title: 'Caching' // https://www.webpackjs.com/guides/caching/  内置 hard-source-webpack-plugin
        }),
        // new BundleAnalyzerPlugin(),
        // new SpeedMeasurePlugin()
    ],
};

module.exports = merge([base_config, dev_config]);
