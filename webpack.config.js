const {argv} = require('yargs');
const {$0, local, setup} = argv;
const middlewareModule = 'webpack-hot-middleware/client?reload=true';
let configs = [];

if(argv['should-build']){
    configs = require('./webpack.build.config');
} else {
    configs = require('./webpack.dev.config');
}

module.exports = configs;