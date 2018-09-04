const merge = require('webpack-merge')

const devConfig = require('./build/webpack.dev.conf')
const prodConfig = require('./build/webpack.prod.conf')
const baseConfig = require('./build/webpack.base.conf')

console.log(process.env.NODE_ENV)
const isDev = process.env.NODE_ENV !== 'production' ? true : false

if (isDev) {
    // development mode下拓展设置
    module.exports = merge(baseConfig, devConfig)
} else {
    // product mode下拓展设置
    module.exports = merge(baseConfig, prodConfig)
}
