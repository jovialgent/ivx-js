import "./index.html";
import "./style.less";
import "./templates";
import "../../src/angular/app.js";
import "../../src/modules/ui/basic";
// import "./end-at.js";
import "../../src/modules/validation/schema";
import config from "./config";
import run from "./run";


angular
    .module('app', ['ivx-js'])
    .config(config)
    .run(run);

