const {argv} = require('yargs');
const {$0, local, setup} = argv;
let configs = [];

if(argv['should-build'] && !local){
    configs = require('./webpack.build.config');
}  else {
    configs = require('./webpack.dev.config');
}

module.exports = configs;