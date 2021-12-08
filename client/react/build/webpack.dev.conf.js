const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: '3000',
        open: true,
        proxy: {
            '/': {
                target: 'http://localhost:3344/'
            },
            changeOrigin: true
        }
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['.awcache/*.*']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../index.html'),
        }),
    ],
    mode: 'development'
}

module.exports = config
