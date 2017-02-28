const less = require('less');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const cleanCSSPlugin = new LessPluginCleanCSS({ advanced: true });
const copyfiles = require('copyfiles');
const fs = require('fs');
const path = require('path');
const watchGlob = require('watch-glob');
const colors = require('colors');

class LessBuilder {
    constructor(src, dest, options) {
        this.src = src;
        this.dest = dest;
        this.options = options;
    }

    build() {
        let {src, dest, options = {}} = this;
        let {watch = false, watchPath = "client"} = options;
        let self = this;

        if (watch) {
            watchGlob(`${watchPath}/**/*.less`, {}, function (filePath) {
                self.__run();
            })
        }

        return this.__run();
    }

    __run() {
        let {src, dest, options = {}} = this;
        let {sourceMap = true} = options;
        let promise = new Promise((resolve, reject) => {

            fs.readFile(src, "utf8", function (err, data) {
                if (err) {
                    reject(err);
                    return;
                }

                let srcPath = path.dirname(src) + "/";
                let srcFile = path.basename(src);
                let destFile = srcFile.replace("less", "css");
                var filePathUpdate = data.replace(/\.\//g, srcPath);
                var opts = {
                    plugins: [cleanCSSPlugin]
                }

                console.log(`Creating css file from ${src} to ${dest}/${destFile}`.blue);

                if (sourceMap) {
                    opts.sourceMap = {
                        sourceMapFileInline: true
                    }
                }

                less.render(filePathUpdate, opts, function (error, output) {
                    if (err) {
                        console.log(`Error making css file from ${src} to ${dest}/${destFile}`.red);
                        reject(err);
                        return
                    }

                    fs.writeFile(`${dest}/${destFile}`, output.css, function (err) {
                        if (err) {
                            console.log(`Error making css file from ${src} to ${dest}/${destFile}`.red);
                            reject(err);
                            return;
                        }
                        
                        console.log(`Created css file from ${src} to ${dest}/${destFile}`.green);
                        resolve();
                    });
                })
            })
        });

        return promise;

    }
}

module.exports = LessBuilder;