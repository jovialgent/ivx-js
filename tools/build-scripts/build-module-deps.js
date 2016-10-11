var fs = require('fs');
var browserify = require('browserify');
var modules = {
    data : {
        "ivx-io" : "src/modules/data/ivx-io/index.js",
        firebase : "src/modules/data/firebase/index.js"
    },
    ui : {
        "semantic-ui" : "src/modules/ui/semantic-ui/index.js",
        bootstrap  : "src/modules/ui/bootstrap/index.js",
        materialize : "src/modules/ui/materialize/index.js"
    },
    validation : {
        schema : "src/modules/validation/schema/index.js"
    }
};
var moduleTypes = Object.keys(modules);
var mkdirp = require('mkdirp');

moduleTypes.forEach(function(moduleType, index){
    var moduleNames = Object.keys(modules[moduleType]);

    moduleNames.forEach(function(moduleName, index){
        var source = modules[moduleType][moduleName];
        var fileName = "iVXjs."+moduleType+"."+moduleName+".js";
        var compressedFileName = "iVXjs."+moduleType+"."+moduleName+".min.js";
        var filePath = "tools/modules/"+moduleType+"/"+moduleName;
        var dest = filePath + "/" + fileName;
        var destCompress =  filePath + "/" + compressedFileName;

        mkdirp(filePath, function(){
             bundle(source, dest);
             compress(source, destCompress);
        }); 
    });
});

function compress(source,dest){
      console.log("BUILDING:", source, " TO DESTINATION:", dest);
      browserify(source)
        .transform("babelify", {presets : ["es2015"]})
        .transform({global:true}, 'uglifyify')
        .bundle()
        .pipe(fs.createWriteStream(dest));
}

function bundle(source, dest){
     console.log("BUILDING:", source, " TO DESTINATION:", dest);
    browserify(source)
        .transform("babelify", {presets : ["es2015"]})
        .bundle()
        .pipe(fs.createWriteStream(dest));
}


