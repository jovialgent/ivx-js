import "./index.html";
import "./style.less";
import "../../src/angular/app.js";
import "../../src/modules/validation/schema";
import "../../src/modules/ui/basic";
import run from "./run";
import "./templates";

angular
    .module('app', ['ivx-js'])
    .run(run);
