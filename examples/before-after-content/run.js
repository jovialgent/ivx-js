import htmlConfig from "./html.json";

appRun.$inject = ['$rootScope'];


function appRun($rootScope, iVXjs) {
    $rootScope.config = htmlConfig;
}

export default appRun;