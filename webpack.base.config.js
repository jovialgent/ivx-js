const { argv } = require('yargs');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const webpack = require('webpack');
const path = require('path');
const devtoolMin = "inline-source-map";
const devtool = false;

class BaseWebpackConfig {
    constructor(overrides, minify, subfolder) {
        Object.assign(this, {
            overrides,
            minify,
            subfolder
        })
    }

    buildConfigs(buildPaths) {
        const self = this;

        return buildPaths.map(buildPath => {
            return self._overrideDefault(buildPath);
        });
    }

    _overrideDefault(buildPath) {
        const { overrides, subfolder = "" } = this;
        let newConfig = Object.assign({}, this.defaultConfig);
        const defaultPath = newConfig.output.path.replace('[BUILD_PATH]', `${buildPath}${subfolder}`);

        if (overrides.plugins) {
            newConfig.plugins = [].concat(
                newConfig.plugins,
                overrides.plugins
            )
        }


        if (overrides.module && overrides.module.rules) {
            newConfig.module.rules = [].concat(
                newConfig.module.rules,
                overrides.module.rules
            )
        }

        newConfig.output = this._createOutput(newConfig.output, overrides.output, defaultPath);
        newConfig.entry = overrides.entry;

        return newConfig;
    }


    _createOutput(configOutput, overrideOutput, path) {
        let filename = configOutput.filename;

        if (overrideOutput.filename) {
            filename = overrideOutput.filename;
        }

        return {
            path,
            filename
        };
    }

    get defaultConfig() {
        let defaultPlugins = [

        ];

        if (this.minify) {
            defaultPlugins = [].concat(defaultPlugins, [
                new webpack.optimize.UglifyJsPlugin()
            ])
        }

        return {
            devtool: this.minify ? devtoolMin : devtool,
            output: {
                path: path.resolve(__dirname, '[BUILD_PATH]'),
                filename: '[name].ivx.js'
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: [{
                            loader: 'ng-annotate-loader',
                            options: { explicitOnly: false }
                        },
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['env']

                            }
                        }]
                    },
                    {
                        test: /\.html$/,
                        use: [
                            'raw-loader'
                        ]
                    }
                ]
            },
            plugins: defaultPlugins
        }
    }
}

module.exports = BaseWebpackConfig;