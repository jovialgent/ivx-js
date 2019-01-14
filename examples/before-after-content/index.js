// // import "./index.html";
// import "semantic-ui-css/semantic.min";
// import "semantic-ui-css/semantic.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// // // import "../../css/core.css";
// import "materialize-css/dist/css/materialize.min.css";
// import materialize from "materialize-css/dist/js/materialize.min";
import "./style.less";
import "./templates";
import "../../src/angular/app.js";
import "../../src/modules/ui/basic";
import "../../src/modules/ui/semantic-ui";
import "../../src/modules/ui/bootstrap";
import "../../src/modules/ui/materialize";
import "../../src/modules/validation/schema";
import config from "./config";
import run from "./run";


angular
    .module('app', ['ivx-js'])
    .config(config)
    .run(run);

