const webpack = require("webpack");
let path = require('path');

function resolve (dir) {
    path.join(__dirname, dir);
}

module.exports = {
    publicPath: '/',
    assetsDir: 'static',
    productionSourceMap: false,
    configureWebpack: {
        resolve: {
            extensions: ['js', 'vue'],
            alias: {
                '@': resolve('src')
            }
        },
    },
    chainWebpack: (config) => {
        config.resolve.symlinks(true) // 修复热更新失效
    },
    devServer: {
        open:true,
        port:8090,
        proxy: {
            '/api':{
                target:'http://localhost:3000',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':'/api'
                }
            }
        },
    }
}