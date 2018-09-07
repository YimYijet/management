const merge = require('webpack-merge')

const devConfig = require('./build/webpack.dev.conf')
const prodConfig = require('./build/webpack.prod.conf')
const baseConfig = require('./build/webpack.base.conf')

module.exports = (env, argv) => {
    const isDev = argv.mode !== 'production' ? true : false

    if (isDev) {
        // development mode下拓展设置
        return merge(baseConfig, devConfig)
    } else {
        // production mode下拓展设置
        return merge(baseConfig, prodConfig)
    }
}
