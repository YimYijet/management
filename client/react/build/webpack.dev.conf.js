const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    devtool: 'eval-source-map',
    devServer: {
        host: 'localhost',
        port: '3000',
        open: true,
        hot: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3344/'
            },
            changeOrigin: true
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../index.html'),
        }),
    ],
    mode: 'development'
}

module.exports = config
