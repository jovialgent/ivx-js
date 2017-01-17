var browserify = require("browserify");
var watchify = require("watchify");
var errorify = require("errorify");
var minimist = require("minimist");
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var output = argv.output;
var input = argv.input;
var packageJSON = require('../../package.json');

var inputMap = {
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
var outputMap = {
    sandbox: "tools/sandbox/public/js/lib/iVXjs." + input + ".min.js",
    "story-player" : "influence/story-player/dev/js/deps/iVXjs."+input+".min.js",
    "story-player-dev" : "influence/story-player/local-build/js/iVXjs."+input+".min.js"
}

// Command: node tools/build-scripts/watch-module-deps.js --input [MODULE] --output [DESTINATION]

var inputPath = getValueByPath(input, inputMap);
var outputPath = outputMap[output];

if (inputPath && outputPath) {
    setup(inputPath, outputPath);
}

function setup() {
    var browserifyInstance = browserify({
        entries: [inputPath],
        cache: {},
        packageCache: {},
        debug: true,
        plugin: [watchify, errorify]
    })
        .transform("babelify", { presets: ["es2015"] });
        // .transform({ global: true }, 'uglifyify');

    console.log("INPUT:", inputPath);
    console.log("OUTPUT:", outputPath);
    
    browserifyInstance.on('update', bundle);
    bundle();

    function bundle() {
        browserifyInstance.bundle().pipe(fs.createWriteStream(outputPath));
    }
}

function getValueByPath(objectPath, data) {
    if(!objectPath) return;
    var paths = objectPath.split('.');
    var oldData = data;
    var value;

    paths.forEach(function (path, index) {
        currentData = oldData[path];

        if (typeof currentData === "string") {
            value = currentData;
        } else {
            oldData = currentData;
        }
    });

    return value;
}



