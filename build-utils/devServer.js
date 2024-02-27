const { srcPath, distPath } = require("./paths");
const path = require('path');
console.log(distPath);
/**
 * 通用 devServer 定义
 * @author: wangqiaoling
 * @date: 2024/02/27
 */
const devServer = {
    open: true,  // 自动打开浏览器
    port: 8000,
    compress: true,  // 启动 gzip 压缩
    allowedHosts: 'all',
    static: {
        directory: path.join(srcPath, 'assets'),
        // publicPath: path.join(srcPath, 'assets')
    },
    // static: distPath,
    // output: {
    //     // TODO ？？没懂
    //     publicPath: '/'
    // },
    // **********************************
    // ------- 使用测试环境接口时用 --------
    // **********************************
    // 设置代理
    proxy: [
        // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
        {
            context: ['/api'],
            target: 'http://localhost:3000',
        },
        // 将本地 /api2/xxx 代理到 localhost:3000/xxx
        {
            context: ['/api2'],
            target: 'http://localhost:3000',
            pathRewrite: {
                '^/api2': ''
            }
        }
    ]
};

module.exports = devServer
