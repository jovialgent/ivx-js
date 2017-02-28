const fs = require('fs');
const glob = require('glob');
const babel = require('babel-core');
const watchGlob = require('watch-glob');
const colors = require('colors');

class TemplateCache {
    constructor() {

    }

    build(src, dest, watch = false) {
        var self = this;
        var promise = this.__run(src, dest);

        if (watch) {
            watchGlob(src, {}, function (filePath) {
                self.__run(src, dest);
            })
        }

        return promise;
    }

    createTemplatePath(fileName) {
        let fileParts = fileName.replace('client/', '');

        return `${fileParts}`;
    }

    __run(src, dest) {
        var self = this;
        var promise = new Promise((resolve, reject) => {
            glob(src, {}, (err, files) => {
                if (err) return;

                console.log(`Creating templates file from ${src} to ${dest}`.blue);
                
                let fileCode = files.reduce((codeFunction, fileName) => {
                    let htmlContent = fs.readFileSync(fileName);
                    let templatePath = self.createTemplatePath(fileName);

                    return `${codeFunction}$templateCache.put('${templatePath}', \`${htmlContent}\`);\n`;
                }, '');

                let file = `
                angular
                    .module('app')
                    .run(['$templateCache', ($templateCache)=>{
                        ${fileCode}
                    }]);            
            `;

                let transpiledFile = babel.transform(file, { presets: 'es2015' }, function (err, code) {

                });

                fs.writeFile(`${dest}/templateCache.js`, transpiledFile.code, () => {
                    console.log(`Creating templates file from ${src} to ${dest}`.green);
                    resolve()
                });

            })
        });

        return promise;
    }

}


module.exports = TemplateCache;