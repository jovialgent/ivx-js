const BaseConfig = require('./webpack.base.config');
const regularConfig = new BaseConfig({
    entry: {
        angular: "./src/angular/app.js"
    },
    output: {
        filename: '[name].ivx.js'
    }
});
const minifyConfig = new BaseConfig({
    entry: {
        angular: "./src/angular/app.js"
    },
    output: {
        filename: '[name].ivx.min.js'
    }
}, true);

module.exports = [].concat(
    regularConfig,
    minifyConfig
);