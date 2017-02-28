const fs = require('fs');
const glob = require('glob');
const browserify = require("browserify");
const watchify = require("watchify");
const errorify = require("errorify");
const minimist = require("minimist");
const Immutable = require('immutable');
const colors = require('colors');

class BrowserifyBuilder {
    constructor(src, dest, options = {}, watch = false) {
        this.src = src;
        this.dest = dest;
        this.options = options;
        this.watch = watch;
    }

    get defaultOptions() {
        return {
            cache: {},
            packageCache: {},
            plugin: [errorify]
        }
    }

    build() {
        let {src, dest, options, watch} = this;
        let {fileName = 'app.js'} = options; 
        let {bundle, browserifyInstance} = this.__run();

        if (watch) {
            browserifyInstance.on('update', () => {
                bundle(fileName)
            });
        }

        return bundle(fileName);
    }

    __run() {
        let {options, watch, src, dest} = this;
        let currentOptions = Immutable.Map(options);
        let {transformer, minified, sourceMaps, flieName = "app.js"} = options;

        currentOptions = currentOptions.set('entries', [src]);
        currentOptions = currentOptions.set('pacakgeCache', {});
        currentOptions = currentOptions.set('cache', {});
        

        if (sourceMaps) {
            currentOptions = currentOptions.set('debug', true);
        }

        if (watch) {
            currentOptions = currentOptions.set('plugin', [errorify, watchify]);
        }

        var browserifyInstance = browserify(currentOptions.toJS());

        if (transformer) {
            let {name: transformerName, options: transformerOptions} = transformer;

            browserifyInstance.transform(transformerName, transformerOptions);
        }

        if (minified) {
            browserifyInstance.transform({ global: true }, 'uglifyify');
        }

        return {
            bundle,
            browserifyInstance
        }

        function bundle(fileName) {  
            console.log(`Creating the browserified file from ${src} to ${dest}/${fileName}`.blue);

            let stream = browserifyInstance.bundle().pipe(fs.createWriteStream(`${dest}/${fileName}`));
            
            let bundlePromise = new Promise((resolve, reject) => {
                stream.once('finish', () => {
                    console.log(`Finished creating the browserified file from ${src} to ${dest}/${fileName}`.green);
                    resolve();
                })
            });
            return bundlePromise;
        }
    }
}

module.exports = BrowserifyBuilder;