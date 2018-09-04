const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin')

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
        index: path.join(__dirname, './src/index.tsx')
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, './dist'),
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.jsx', '.js'
            , '.json'
        ],
        alias: {
            '@': path.join(__dirname, '..', 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts(x?)|js(x?))$/,
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        transpileOnly: true,
                        useCache: true,
                        useBabel: true,
                        babelOptions: {
                            babelrc: false,
                            plugins: ['transform-class-properties', 'syntax-dynamic-import', 'react-hot-loader/babel']
                        },
                        getCustomTransformers: () => ({
                            before: [
                                tsImportPluginFactory({
                                    libraryName: 'antd',
                                    libraryDirectory: 'lib',
                                    style: true
                                })
                            ]
                        })
                    }
                }],
                include: path.join(__dirname, './src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: path.join(__dirname, './styles'),
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
