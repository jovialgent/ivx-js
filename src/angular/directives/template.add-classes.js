import createFactoryFunction from '../utilities/create-factory-function.js';
// CONTROLLER
// import {[CTRLNAME]} from '[CTRLFILE]';

class AddClasses {
    constructor(iVXjs) {
        this.restrict = 'A';
        this.controller = ["iVXjs", (iVXjs) => {

        }];
        this.link = ($scope, iElm, iAttrs, controller) => {
            iElm[0].addEventListener('click', (event) => {
                let { ivxAddClasses } = iAttrs;
                try {
                    const eventObj = $scope.$eval(ivxAddClasses);

                    if (angular.isObject(eventObj)) {
                        iVXjs.experience.addClasses(eventObj);
                    }

                } catch (e) {
                    iVXjs.log.error({ message: `Can't fire event due attribute not being a valid object. Please check your template definition for 'ivx-add-classes'.` })
                }
            }, false);
        }
    }

}

AddClasses.$inject = ['iVXjs'];

export default angular
    .module('ivx-js.directives.template.add-classes', [])
    .directive('ivxAddClasses', createFactoryFunction(AddClasses))
    .name;