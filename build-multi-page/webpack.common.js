const path = require('path')
const {srcPath} = require('../build-utils/paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// module: {
//     rules: [{
//         test: /\.[jt]sx?$/,
//         exclude: /node_modules/,
//         use: {
//             loader: 'babel-loader'
//         }
//     }, {
//         test: /\.css$/,
//         use: [
//             {loader: MiniCssExtractPlugin.loader},
//             {loader: 'css-loader'},
//             {loader: 'postcss-loader'}
//         ]
//     }, {
//         test: /\.less$/,
//         use: [
//             {loader: MiniCssExtractPlugin.loader},
//             {
//                 loader: 'css-loader',
//                 options: {
//                     importLoaders: 1,
//                     modules: {
//                         auto: resourcePath => resourcePath.endsWith('.less'),
//                         localIdentName: '[local]_[hash:base64:5]',
//                         localIdentHashSalt: Date.now() + '' // hash的salt取编译时间，保证每次编译生成的class名字都不一样
//                     }
//                 }
//             },
//             {loader: 'postcss-loader'},
//             {
//                 loader: 'less-loader',
//                 options: {
//                     lessOptions: {javascriptEnabled: true}
//                 }
//             }
//         ]
//     }, {
//         test: /\.(png|jpe?g|gif)$/,
//         type: 'asset/resource',
//         exclude: /node_modules|icons/
//     }, {
//         test: /\.svg$/,
//         issuer: /\.(css|less)$/,
//         type: 'asset/resource',
//         exclude: /node_modules/
//     }, {
//         exclude: /node_modules/,
//         test: /\.svg$/,
//         issuer: /\.[jt]sx?$/,
//         use: [{loader: '@svgr/webpack', options: {icon: true}}]
//     }]
// },
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