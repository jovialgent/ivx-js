var fs = require('fs');
var browserify = require('browserify');
var minimist = require("minimist");
var argv = require('minimist')(process.argv.slice(2));
var semver = require('semver');
var output = argv.output;
var input = argv.input;
var version = argv.version;
var packageJSON = require('../../package.json');
var moduleFiles = fs.readdirSync('tools/modules');
var cleanedModuleFileNames = moduleFiles.reduce(function (legitFiles, moduleFileName, index) {
    if (semver.valid(moduleFileName)) {
        legitFiles.push(moduleFileName)
    }
    return legitFiles;
}, []);
var recentFolderVersion = cleanedModuleFileNames.sort(compareVersion)[0];
var newFolderVersion = semver.inc(recentFolderVersion, 'patch');
var newVersion = semver.gt(packageJSON.version, newFolderVersion) ? packageJSON.version : newFolderVersion;
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

    buildFiles(path);
}


if (output === 'tools') {
   var path = "tools/modules/" + newVersion;

    buildFiles(path);
}

function compareVersion(versionFolderA, versionFolderB) {
    if (semver.lt(versionFolderA, versionFolderB)) {
        return 1;
    }
    if (semver.gt(versionFolderA, versionFolderB)) {
        return -1;
    }
    // a must be equal to b
    return 0;
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


