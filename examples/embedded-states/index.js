
import "../../src/angular/app.js";
import "../../src/modules/validation/schema";
import "../../src/modules/ui/basic";

import config from "./config";
// import config from "./playlist";
import run from "./run";
import "./templates";


angular
    .module('app', ['ivx-js'])
    .config(config)
    .run(run);
