import "./index.html";
import "./style.less";
import "../../src/angular/app.js";
import "../../src/modules/validation/schema";
import "./components/custom-input";
// import "../../src/modules/ui/basic";
import "../../src/modules/data/ivx-io";
import config from "./config";
import run from "./run";

angular
    .module('app', ['ivx-js'])
    .config(config)
    .run(run);

angular
    .module('ivx-js')
    .service('ivxAnalyticsGoogleTagManagerService', ()=>{})
    .service('ivxActionsSupportRulesService', ()=>{})

