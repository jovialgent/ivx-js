import "./index.html";
// import "./style.less";
// import "semantic-ui-css/semantic.min";
// import "semantic-ui-css/semantic.min.css";
import "../../src/angular/app.js";
import "../../src/modules/validation/schema";
import "../../src/modules/ui/basic";
import "../../src/modules/analytics/google";
// import "../../../src/modules/ui/basic";  

/* Semantic UI Dependencies */
// import "../../../src/modules/ui/semantic-ui";
// import "semantic-ui-css/semantic.min";
// import "semantic-ui-css/semantic.min.css";

/* Bootstrap Dependencies */
// import "../../../src/modules/ui/bootstrap/index.js";
// import "bootstrap-css-only/css/bootstrap.css";


import config from "./config";
import run from "./run";

angular
    .module('app', ['ivx-js'])
    .config(config)
    .run(run);

