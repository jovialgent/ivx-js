const copyfiles = require('copyfiles');
const watchGlob = require('watch-glob');
const colors = require('colors');


class Pipe {
    constructor(src, dest, options = {}) {
        this.src = src;
        this.dest = dest;
        this.options = options;
    }

    build() {
        let self = this;
        let {options, src} = this;
        let {watch = false} = options;
        let pipePromise = this.__run();

        if (watch) {
            watchGlob(src, {}, () => {
                self.__run();
            })
        }

        return pipePromise;
    }

    __run() {
        let {src, dest, options} = this;
        let {cb = () => { }, flatten = true} = options;
        let promise = new Promise((resolve, reject) => {
            console.log(`Piping file from ${src} to ${dest}`.blue);

            copyfiles([src, dest], flatten, () => {
                cb();
                resolve();
                console.log(`Finished piping file from ${src} to ${dest}`.green);
            });
        });

        return promise;
    }
}

module.exports = Pipe;