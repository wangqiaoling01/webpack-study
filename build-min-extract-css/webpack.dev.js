const {merge} = require('webpack-merge')
const webpackCommonConf = require('./webpack.common')
const devServerConfig = require('../build-utils/devServer')
const webpack = require('webpack')

module.exports = merge(webpackCommonConf, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: devServerConfig,
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify('development')
        })
    ]
})