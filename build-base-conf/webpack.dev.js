const webpack = require('webpack');
const webpackCommonConf = require('./webpack.common');
const {merge} = require('webpack-merge');
const devServerConfig = require('../build-utils/devServer');

module.exports = merge(webpackCommonConf, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: devServerConfig,
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify('development')
        })
    ]
});