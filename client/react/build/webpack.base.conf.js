const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 提取 .vue下的样式合并到一个文件
const extractVueStyle = new ExtractTextPlugin({
    filename: 'css/[name].vue.[hash:5].css',
    allChunks: true
})

const extractCss = new ExtractTextPlugin({
    fileName: 'css/[name].[hash:5].css',
    allChunks: true
})

const extractSass = new ExtractTextPlugin({
    fileName: 'css/[name].sass.[hash:5].css',
    allChunks: true
})
const config = {
    entry: {
        index: path.join(__dirname, './client/src/main.js')
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, './client/dist'),
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'Vue': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, '..', 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: extractVueStyle.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    },
                    postLoaders: {
                        html: 'babel-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.join(__dirname, './client/src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: path.join(__dirname, './client/styles'),
                loader: extractCss.extract({
                    use: [{
                            loader: 'css-loader',
                            options: { importLoaders: 1 }
                        }, {
                            loader: 'postcss-loader',
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.css$/,
                include: path.join(__dirname, './client/styles'),
                loader: extractVueStyle.extract({
                    use: [ 'style-loader', 'postcss-loader', {
                            loader: 'css-loader',
                            options: { importLoaders: 1 }
                        }
                    ],
                    fallback: 'vue-style-loader'
                })
            },
            {
                test: /\.scss$/,
                loader: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // 在开发环境使用 style-loader
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [{
                    loader: 'url-loader',
                    option: {
                        limit: 8192,        // 小于8k图片转换为base64格式
                        outputPath: 'images/'   // 图片打包后地址
                    }
                }]
            },
            {
                test: /\.(eot|tff|woff|svg)$/,
                use: 'file-loader'
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-withimg-loader'
                }]
            }
        ]
    },
    plugins: [
        extractVueStyle,
        extractCss,
        extractSass,
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
        }
    }
}

module.exports = config
