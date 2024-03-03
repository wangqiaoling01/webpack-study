const HtmlWebpackPlugin = require('html-webpack-plugin')
const {srcPath} = require('../build-utils/paths')
const path = require('path')

module.exports = {
    entry: {
        index: path.join(srcPath, 'index.js'),
        other: path.join(srcPath, 'other.js')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                use: 'babel-loader',
                exclude: /node_modules/,
                include: srcPath
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            chunks: ['index', 'common', 'vendor']
        }),
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks: ['other', 'common', 'vendor']
        })
    ],
    resolve: {
        alias: {
            '@': srcPath
        }
    }
}