const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const extractCss = new ExtractTextPlugin({
    filename: 'static/css/[name].[hash:5].css',
    allChunks: true
})

const extractSass = new ExtractTextPlugin({
    filename: 'static/css/[name].sass.[hash:5].css',
    allChunks: true
})

const extractLess = new ExtractTextPlugin({
    filename: 'static/css/[name].less.[hash:5].css',
    allChunks: true
})

const config = {
    entry: {
        index: path.join(__dirname, '../src/index.tsx')
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, '../dist'),
        filename: 'static/js/[name].[hash].js',
        chunkFilename: 'static/js/[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
        alias: {
            '@': path.join(__dirname, '..', 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts(x?)|js(x?))$/,
                loader: ['babel-loader', 'ts-loader'],
                include: path.join(__dirname, '../src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: path.join(__dirname, '../src/styles'),
                loader: extractCss.extract({
                    use: [{
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    }, {
                        loader: 'postcss-loader',
                    }],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.scss$/,
                loader: extractSass.extract({
                    use: ['css-loader', 'sass-loader'],
                    // 在开发环境使用 style-loader
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.less$/,
                loader: extractLess.extract({
                    use: ['css-loader', {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }],
                    // 在开发环境使用 style-loader
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,        // 小于8k图片转换为base64格式
                        outputPath: 'images/'   // 图片打包后地址
                    }
                }
            },
            {
                test: /\.(eot|tff|woff|svg)$/,
                use: 'file-loader'
            },
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            }
        ]
    },
    plugins: [
        extractCss,
        extractSass,
        extractLess,
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10
                },
                utils: {
                    chunks: 'initial',
                    name: 'utils',
                    minSize: Infinity
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
        ]
    }
}

module.exports = config
