import "./index.html";
import "./style.less";
import "../../src/angular/app.js";
import "../../src/modules/validation/schema";
import "../../src/modules/analytics/google";
import "../../src/modules/ui/basic";
import "../../src/modules/data/ivx-io";
import "semantic-ui-css/semantic.min";
import "semantic-ui-css/semantic.min.css";
import "../../src/modules/ui/semantic-ui";
import directive from  "ivx-story-player/src/js/directives/analytics/google-tag-manager/google-tag-manager.directive";
import service from  "ivx-story-player/src/js/directives/analytics/google-tag-manager/google-tag-manager.service";
import "ivx-story-player/src/js/directives/actions-support-rules";
import "ivx-story-player/src/js/services/add-actions-to-experience";
import config from "./config";
import run from "./run";

angular
    .module('app', ['ivx-js'])
    .config(config)
    .run(run);


angular.module('ivx-js')
.directive('ivxAnalyticsGoogleTagManagerDirective', directive)
.service('ivxAnalyticsGoogleTagManagerService', service)

