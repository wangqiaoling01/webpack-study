const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {srcPath} = require('../build-utils/paths')

module.exports = {
    entry: path.join(srcPath, 'index'),
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html'
        })
    ]
}
