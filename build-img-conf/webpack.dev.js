const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common')
const {merge} = require('webpack-merge')
const devServerConfig = require('../build-utils/devServer');

module.exports = merge(webpackCommonConf, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: devServerConfig,
    plugins: [
        new webpack.DefinePlugin({
            // window.ENV = 'development'
            ENV: JSON.stringify('development')
        })
    ],
    module: {
        rules: [
            // 直接引入图片 url
            // npm i file-loader -D
            {
                test: /\.(gif|png|jpg|jpeg)$/,
                use: ['file-loader']
            }
        ]
    }
});