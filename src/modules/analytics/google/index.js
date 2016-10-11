export class Google{
    constructor(){

    }
}

module.export = initializeGoogle;

if (angular && angular.module('ivx-js')) {
    angular
        .module('ivx-js')
        .constant('iVXjs.analytics.google', initializeGoogle);
}

function initializeGoogle(settings) {
    settings.module = Google;

    return settings;
}