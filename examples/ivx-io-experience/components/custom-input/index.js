import directive from "./custom-input.directive";
import service from "./custom-input.service";

angular
    .module('ivx-js')
    .directive('ivxjsCustomInputInput', directive)
    .service('iVXjsCustomInputInputService', service)