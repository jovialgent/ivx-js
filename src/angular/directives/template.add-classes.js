import createFactoryFunction from '../utilities/create-factory-function.js';
// CONTROLLER
// import {[CTRLNAME]} from '[CTRLFILE]';

class AddClasses {
    constructor(iVXjs, iVXjsActionTemplateService) {
        this.restrict = 'A';
        this.controller = ["iVXjs", (iVXjs) => {

        }];
        this.link = ($scope, iElm, iAttrs, controller) => {
            iVXjsActionTemplateService.setup($scope, iElm, iAttrs, _getAddClassesEventObj);


           function _getAddClassesEventObj() {
               const {ivxAddClasses : value} = iAttrs;
               
                try {
                    const args = $scope.$eval(value);

                    return {
                        eventName: "addClasses",
                        args
                    }
                } catch (e) {
                    iVXjs.log.error({ message: `Can't fire event due attribute not being a valid object. Please check your template definition for 'ivx-add-classes'.` })
                }
            }

        }
    }
}

AddClasses.$inject = ['iVXjs', 'iVXjsActionTemplateService'];

export default angular
    .module('ivx-js.directives.template.add-classes', [])
    .directive('ivxAddClasses', createFactoryFunction(AddClasses))
    .name;