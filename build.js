let argv = require('minimist')(process.argv.slice(2), {
    data: "basic",
    analytics: "google",
    validation: "basic",
    ui: "basic"
});


const TemplateCache = require('./tools/builder/$templateCache.js');
const Less = require("./tools/builder/less.js");
const Pipe = require("./tools/builder/pipe.js");
const appJsCreator = require('./tools/builder/app');
const ivxjsAppSettings = require('./tools/developer/ivxjs-settings');
const htmlCreator = require('./tools/developer/html-creator');
const Immutable = require('immutable');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const _ = require('lodash');
const liveServer = require("live-server");

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

    /* 
     * THIS IS FOR CDN BUILDING 
     * TO RUN A LOCAL BUILD RUN COMMAND: 
     * npm run setup
     */ 
    get buildPaths() {
        
        const tcProps = require('teamcity-properties');
        const buildNumber = tcProps['build.number'] ? tcProps['build.number'] : "";

        return {
            root: "",
            dir: [
                "build/cdn/ivx-js/" + buildNumber,
            ],
            postBuild: () => {

            },
            app: [].concat(
                ivxjsAppSettings.generateSettings('build/cdn/ivx-js/' + buildNumber, false, false)
            ),
            assets: []
        }
    }

    get localBuildPaths() {
        return {
            root: "",
            dir: [],
            postBuild: () => {
                liveServer.start({
                    port: 8000,
                    host: '127.0.0.1',
                    root: 'public'
                })
            },
            app: [].concat(
                ivxjsAppSettings.generateSelectedModules('dist', 'dist/modules', argv._, true),
                ivxjsAppSettings.generateSelectedModules('public/js', 'public/js/modules', argv._, true)
            ),
            assets: []
        }
    }

    get setUpPaths() {
        return {
            root: "",
            dir: [
                "public/css",
                "public/js/modules",
                "public/templates",
                "public/data",
                "dist/modules"
            ],
            postBuild: () => {

            },
            app: [].concat(
                ivxjsAppSettings.generateSettings('dist', 'dist/modules', false),
                ivxjsAppSettings.generateSettings('public/js', 'public/js/modules', false)
            ),
            assets: [{
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
            }]
        }
    }

    build() {
        this.__run(this.buildPaths);

    }

    local() {
        this.__run(this.localBuildPaths);
    }

    setUp() {
        this.__run(this.setUpPaths);
    }

    __run(config) {
        let self = this;
        let { root, dir, postBuild = () => { } } = config;

        createDirectory(dir, root, () => {
            self.__runBuild(config)
                .then(() => {
                    postBuild();
                })

        })

    }

    __runBuild(config) {
        let { templates, styles, vendor = {}, app = [], assets, root, dir } = config;
        let DevToolsConfig = new DevTools().config;
        if (this.isLocal) {
            let indexHTMLTemplate = new htmlCreator(DevToolsConfig.project.index.src, DevToolsConfig.project.index.dest, argv._).build();
        }
        let appPromises = appJsCreator.create(app);
        let assetsPromise = this.__processAssets(assets);

        return Promise.all([].concat(assetsPromise, appPromises));
    }

    __buildAppFiles(appConfig) {

    }

    __processAssets(assets) {
        let assetsPromise = assets.map(assetData => {
            let { src, dest, options } = assetData;

            return new Pipe(src, dest, options).build();
        });

        return Promise.all(assetsPromise);
    }

    __processVendorResources(vendorConfig) {
        let { styles = {}, scripts = {} } = vendorConfig;
        let { src: stylesSrc, dest: stylesDest, options: stylesOptions = {} } = styles;
        let { preprocessor = '' } = stylesOptions;
        let { src: scriptsSrc, dest: scriptsDest, options: scriptsOptions = {} } = scripts;
        let stylesPromise, scriptPromise;

        if (preprocessor === 'less') {
            stylesPromise = new Less(stylesSrc, stylesDest, stylesOptions).build();
        }

        scriptPromise = new Pipe(scriptsSrc, scriptsDest, scriptsOptions).build();

        return Promise.all([scriptPromise, stylesPromise]);
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
    if (paths.length === 0) {
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