const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { argv } = require('yargs');
const { $0, local, setup, contentBase } = argv;
let configs = [];

const publicPath = `public${contentBase ? "/" + contentBase : ""}`;


module.exports = {
    entry: {
        dev: `./${publicPath}/index.js`
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: `./${publicPath}`,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            paths: [path.resolve(__dirname, "node_modules")]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    'raw-loader'
                ]
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    publicPath: '',
                    outputPath: 'fonts/'
                }
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    publicPath: '',
                    outputPath: 'images/'
                }
            },
            {
                test: /\.json$/,
                use: [
                    'json-loader'
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: `${publicPath}/index.html`
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, `${publicPath}`)
    }
};