const Browserify = require('./browserify.js');

module.exports.create = (appConfig) => {

    return appConfig.map(config => {
        let {src, dest, options, watch = false} = config;

        return new Browserify(src, dest, options, watch).build();
    })

}

