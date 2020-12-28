const { merge } = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const base_config = require('./webpack.base.config');
// const CompressionPlugin = require('compression-webpack-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');

const prod_config = {
    mode: 'production',
    output: {
      filename: '[name].[contenthash:8].js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/dist',
    },
    module: {
        rules: [
            {
                test: /\.(less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            modifyVars: {
                                'hack': `true; @import "${path.resolve(__dirname, '../src/assets/less/antd/index.less')}";`,
                            }
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            // filename: path.resolve(__dirname, '../middleground/index.html'),
            // favicon: path.resolve(__dirname, '../src/assets/img/favicon.ico'),
        }),
        new webpack.ids.HashedModuleIdsPlugin(), // https://webpack.docschina.org/plugins/hashed-module-ids-plugin/
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
        }),
        new CleanWebpackPlugin(),
        new OptimizeCssAssetsWebpackPlugin({
            cssProcessPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
        }),
        // new CompressionPlugin({
        //     // gzip压缩配置
        //     test: /\.js$|\.html$|\.css/, // 匹配文件名
        //     threshold: 10240, // 对超过10kb的数据进行压缩
        //     deleteOriginalAssets: false, // 是否删除原文件
        // }),
        //PWA
        // new WorkboxPlugin.GenerateSW({
        //   clientsClaim: true,
        //   skipWaiting: true,
        //   importWorkboxFrom: 'local',
        //   include: [/\.js$/, /\.css$/, /\.html$/, /\.jpg/, /\.jpeg/, /\.svg/, /\.webp/, /\.png/],
        // }),
    ],
};

module.exports = merge([base_config, prod_config]);
