import "./index.html";
import "./style.less";
import "../../src/angular/app.js";
import "../../src/modules/validation/schema";
import "../../src/modules/ui/basic";
import config from "./config";
import run from "./run";

angular
    .module('app', ['ivx-js'])
    .config(config)
    .run(run);

