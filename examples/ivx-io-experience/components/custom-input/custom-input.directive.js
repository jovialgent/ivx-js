import controller from "./custom-input.controller";
import link from "./link";
import template from "./template.html";

export default ($filter, $compile, iVXjs, iVXjsCustomInputInputService, iVXjsUIModule, pullInTemplate, iVXjsErrors, ivxExperienceScope) => {
    "ngInject";

    return {
        controllerAs: 'vm',
        bindToController: true,
        template,
        controller,
        link: ($scope, iElm, iAttrs, vm) => {
            link($scope, iElm, iAttrs, vm, { $filter, $compile, iVXjs, iVXjsCustomInputInputService, iVXjsUIModule, iVXjsErrors, pullInTemplate, ivxExperienceScope });
        },
        replace: true,
        scope: {
            inputData: '=inputData'

        },
        restrict: "EA",
    }
}