const path = require('path')
const {distPath} = require('../build-utils/paths')
const webpackCommonConf = require('./webpack.common')
const webpack = require('webpack')
const {merge} = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash:8].js',
        path: distPath
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5 * 1024,
                        outputPath: '/img/'
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            ENV: JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new OptimizeCssAssetsPlugin()
        ],
        splitChunks: {
            /**
             * initial 入口chunk，对于异步导入的文件不处理
             * async 异步chunk，只对异步导入的文件处理
             * all 全部chunk 一般写这个
             */
            chunks: 'all',
            cacheGroups: {
                // 第三方模块
                vendor: {
                    name: 'vendor', // chunk 名称
                    // 当第三方模块也在公共模块中引用了 按权限抽离 命中下面规则
                    priority: 1, // 优先级 权限更高 优先抽离 ！！
                    test: /node_modules/, // 路径
                    minSize: 0, // 大小限制 超过此数值 则命中此规则（按实际需求调整）
                    minChunks: 1, // 最少复用过次数
                },
                common: {
                    name: 'common',
                    priority: 0,
                    minSize: 0,
                    minChunks: 2
                }
            }
        }
    }
})