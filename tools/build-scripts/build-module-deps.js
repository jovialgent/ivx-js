var fs = require('fs');
var browserify = require('browserify');
var minimist = require("minimist");
var argv = require('minimist')(process.argv.slice(2));
var semver = require('semver');
var output = argv.output;
var input = argv.input;
var version = argv.version;
var newVersion = translateVersion(version);
var modules = {
    data: {
        "ivx-io": "src/modules/data/ivx-io/index.js",
        firebase: "src/modules/data/firebase/index.js"
    },
    ui: {
        "semantic-ui": "src/modules/ui/semantic-ui/index.js",
        bootstrap: "src/modules/ui/bootstrap/index.js",
        materialize: "src/modules/ui/materialize/index.js"
    },
    validation: {
        schema: "src/modules/validation/schema/index.js"
    },
    analytics: {
        google: "src/modules/analytics/google/index.js"
    }
};
var moduleTypes = Object.keys(modules);
var mkdirp = require('mkdirp');


if (output === 'cdn') {
     var path = "build/cdn/ivx-js/" + newVersion;

    // buildFiles(path);
}


if (output === 'tools') {
   var path = "tools/modules/" + newVersion;

    // buildFiles(path);
}

function translateVersion(version){
    return version;
}

function buildFiles(path, cb) {
    mkdirp(path, function () {
        moduleTypes.forEach(function (moduleType, index) {
            var moduleNames = Object.keys(modules[moduleType]);
            moduleNames.forEach(function (moduleName, index) {
                var source = modules[moduleType][moduleName];
                var fileName = "iVXjs." + moduleType + "." + moduleName + ".js";
                var compressedFileName = "iVXjs." + moduleType + "." + moduleName + ".min.js";
                var dest = path + "/" + fileName;
                var destCompress = path + "/" + compressedFileName;


                bundle(source, dest);
                compress(source, destCompress);
            });
        });

        compress("src/angular/app.js", path + "/angular.ivx.min.js");
        bundle("src/angular/app.js", path + "/angular.ivx.js");
        compress("src/angular/app.js", "dist/angular.ivx.min.js");
        bundle("src/angular/app.js", "dist/angular.ivx.js");
    });
}

function compress(source, dest) {
    console.log("BUILDING:", source, " TO DESTINATION:", dest);
    browserify(source)
        .transform("babelify", { presets: ["es2015"] })
        .transform({ global: true }, 'uglifyify')
        .bundle()
        .pipe(fs.createWriteStream(dest));
}

function bundle(source, dest) {
    console.log("BUILDING:", source, " TO DESTINATION:", dest);
    browserify(source)
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(fs.createWriteStream(dest));
}


