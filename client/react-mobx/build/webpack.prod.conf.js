const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const config = {
    plugins: [
        new CleanWebpackPlugin(['dist/*', '.awcache/*.*'], {
            root: path.join(__dirname, '..'),
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
            },
            chunksSortMode: 'dependency',
        }),
        new CompressionPlugin({
            test: /\.(js|css)$/,
            threshold: 10240,
            algorithm: 'gzip',
            deleteOriginalAssets: true,
        })
    ],
    mode: 'production'
}

module.exports = config
