var browserify = require("browserify");
var watchify = require("watchify");
var errorify = require("errorify");
var minimist = require("minimist");
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var output = argv.output;
var input = argv.input;
var inputMap = {
    data: {
        firebase: "src/modules/data/firebase/index.js",
        "ivx-io": "src/modules/data/ivx-io/index.js"
    },
    ui : {
        materialize : "src/modules/ui/materialize/index.js"
    }
}
var outputMap = {
    sandbox: "tools/sandbox/public/js/lib/iVXjs." + input + ".min.js"
}

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
        plugin: [watchify, errorify]
    })
        .transform("babelify", { presets: ["es2015"] })
        .transform({ global: true }, 'uglifyify');

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



