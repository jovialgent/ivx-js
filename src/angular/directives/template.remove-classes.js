import createFactoryFunction from '../utilities/create-factory-function.js';
// CONTROLLER
// import {[CTRLNAME]} from '[CTRLFILE]';

class RemoveClasses {
    constructor(iVXjs, iVXjsActionTemplateService) {
        this.restrict = 'A';
        this.controller = ["iVXjs", (iVXjs) => {

        }];
        this.link = ($scope, iElm, iAttrs, controller) => {
            iVXjsActionTemplateService.setup($scope, iElm, iAttrs, _getRemoveClassesEventObj);

            function _getRemoveClassesEventObj() {
                const { ivxRemoveClasses: value } = iAttrs;

                try {
                    const args = $scope.$eval(value);

                    return {
                        eventName: "removeClasses",
                        args
                    }

                } catch (e) {
                    iVXjs.log.error({ message: `Can't fire event due attribute not being a valid object. Please check your template definition for 'ivx-remove-classes'.` })
                }
            };
        }
    }

}

RemoveClasses.$inject = ['iVXjs', 'iVXjsActionTemplateService'];

export default angular
    .module('ivx-js.directives.template.remove-classes', [])
    .directive('ivxRemoveClasses', createFactoryFunction(RemoveClasses))
    .name;