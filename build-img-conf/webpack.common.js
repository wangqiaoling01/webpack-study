const path = require('path');
const {srcPath} = require('../build-utils/paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(srcPath, 'index'),
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
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
        })
    ],
    resolve: {
        alias: {
            '@': srcPath
        }
    },
}