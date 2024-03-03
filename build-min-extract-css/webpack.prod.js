const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackCommonConf = require('./webpack.common.js')
const { distPath } = require('../build-utils/paths.js')

module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash:8].js',
        path: distPath
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5 * 1024,
                        outputPath: '/img/'
                    }
                },
            },
            // 抽离css
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            // 抽离less
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            ENV: JSON.stringify('production')
        }),
        // 抽离 css 文件，将其放到 /css 目录下
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].js'
        })
    ],
    optimization: {
        // 压缩 css
        minimizer: [
            new TerserPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
})