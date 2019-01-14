import "./index.html";
import "./style.less";
import "../../src/angular/app.js";
import "../../src/modules/validation/schema";
import "../../src/modules/analytics/google";
import "../../src/modules/ui/basic";
import "../../src/modules/ui/bootstrap";
import "../../src/modules/ui/materialize";
import "../../src/modules/ui/semantic-ui";
import "../../src/modules/data/ivx-io";
import "../../src/modules/data/firebase";
import config from "./config";
import run from "./run";

angular
    .module('app', ['ivx-js'])
    .config(config)
    .run(run);

