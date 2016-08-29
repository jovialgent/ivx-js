require('./traceur/traceur-runtime.js');
var iVXjs = require('./app-build/core/app');
require('./deps/angular/angular.min.js');
require('./app-build/angular/app.js');
require('./deps/angular/angular-sanitize.min.js');
require('./deps/angular/angular-ui-router.min.js');
exports.module = iVXjs;