const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { argv } = require('yargs');
const { $0, local, setup, contentBase: example } = argv;
let configs = [];

const examplePath = `examples/${example}`;


module.exports = {
    entry: {
        dev: `./${examplePath}/index.js`
    },
    devtool: 'inline-source-map',
    devServer: {
        disableHostCheck: true, 
        contentBase: `./${examplePath}`,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'ng-annotate-loader',
                    options: { explicitOnly: false }
                },
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']

                    }
                }],
                exclude: [/src\/lib/, /node_modules/]
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
            filename: `${examplePath}/index.html`
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, `${examplePath}`)
    }
};