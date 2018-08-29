const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")

const config = {
    plugins: [
        new CleanWebpackPlugin('/client/dist'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, './client/index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new UglifyJsPlugin({
            parallel: true
        }),
        new CompressionPlugin({
            test: /\.(js|css)$/,
            threshold: 10240,
        })
    ]
}

module.exports = config
