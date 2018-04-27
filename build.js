const Pipe = require("./tools/builder/pipe.js");
const { argv } = require("yargs");
const htmlCreator = require('./tools/developer/html-creator');
const mkdirp = require('mkdirp');
const _ = require('lodash');
const webpackConfig = require('./webpack.config.js');
const webpackDevConfig = require('./webpack.dev.config.js');

class Builder {
    constructor(process) {
        this.isLocal = process === 'local';
        this.isSetUp = process === 'setup';

        if (this.isLocal) {
            this.local()
        } else if (this.isSetUp) {
            this.setUp();
        } else {
            this.build();
        }
    }

    build() {
        const libraryBuilder = require('./tools/builder/library');

        libraryBuilder.create(webpackConfig);
    }

    local() {
        new htmlCreator('tools/snippets/index.html', 'public').build();
    }

    setUp() {
        const dir = [
            "public/css",
            "public/js/modules",
            "public/templates",
            "public/data",
            "dist/modules"
        ];
        const assets = [{
            src: "tools/snippets/project.json",
            dest: "public/data"
        }, {
            src: "tools/snippets/templates/*.html",
            dest: "public/templates"
        }, {
            src: "tools/snippets/core.css",
            dest: "public/css"
        }, {
            src: "tools/snippets/style.css",
            dest: "public/css"
        }, {
            src: "tools/snippets/index.js",
            dest: "public/"
        }]

        let assetsPromise = this.__processAssets(assets);

        createDirectory(dir, "", () => {
            assetsPromise.then(() => {

            });
        });
    }

    __processAssets(assets = []) {
        let assetsPromise = assets.map(assetData => {
            let { src, dest, options } = assetData;

            return new Pipe(src, dest, options).build();
        });

        return Promise.all(assetsPromise);
    }
}

class DevTools {
    constructor() {

    }

    get config() {
        return {
            moduleCreator: {
                registerFiles: {
                    styles: "client/styles.less",
                    scripts: "client/app.js"
                },
                registerIndicators: {
                    styles: {
                        start: "// Start Modules",
                        end: "// End Modules"
                    },
                    scripts: {
                        import: "//END OF DIRECTIVES",
                        register: "//END OF REGISTER DIRECTIVE"
                    }
                },
                snippets: {
                    controller: "tools/snippets/controller.js",
                    directive: "tools/snippets/directive.js",
                    styles: "tools/snippets/index.less",
                    template: "tools/snippets/template.html"
                }
            },
            project: {
                index: {
                    src: "tools/snippets/index.html",
                    dest: "public"
                }
            }
        }
    }
}

function createDirectory(paths, buildPath, cb) {
    if (!paths || paths.length === 0) {
        cb();
        return;
    }

    var path = buildPath + _.head(paths);

    mkdirp(path, function () {
        createDirectory(_.tail(paths), buildPath, cb);
    });
}

function shouldBuld(args) {
    return args.find(arg => {
        return arg.indexOf('karma') < 0;
    })
}

if (argv['should-build']) {
    if (argv.local) {
        new Builder("local");
    } else if (argv.setup) {
        new Builder("setup");
    } else {
        new Builder();
    }
}

module.exports.DevTools = new DevTools();