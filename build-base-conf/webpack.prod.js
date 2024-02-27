const webpack = require('webpack')
const {merge} = require('webpack-merge')
const webpackCommonConf = require('./webpack.common')
const { distPath } = require('../build-utils/paths');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 生产环境配置
module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
        // 打包代码时，加上 hash 戳
        filename: 'bundle.[contenthash:8].js',
        path: distPath,
        // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
    },
    plugins: [
        // 会默认清空 output.path 文件夹
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            ENV: JSON.stringify('production')
        })
    ]
});