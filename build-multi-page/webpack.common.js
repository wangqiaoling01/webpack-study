const path = require('path')
const {srcPath} = require('../build-utils/paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        index: path.join(srcPath, 'index.js'),
        other: path.join(srcPath, 'other.js')
    },
    module: {
        rules: [
            // npm i babel-loader @babel/core @babel/preset-env -D
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
                include: srcPath
            },
            // npm i style-loader css-loader postcss-loader -D
            {
                test: /\.css$/,
                // loader 的执行顺序是：从后往前
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            // npm i less-loader -D
            {
                test: /\.less$/,
                // 注意顺序
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        // 生成 index.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
            chunks: ['index'] // 只引用 index.js
        }),
        // 生成 other.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks: ['other'] // 只引用 other.js
        })
    ],
    resolve: {
        alias: {
            '@': srcPath
        }
    },
}