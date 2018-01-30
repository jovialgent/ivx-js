import createFactoryFunction from '../utilities/create-factory-function.js';
// CONTROLLER
// import {[CTRLNAME]} from '[CTRLFILE]';

class RemoveClasses {
    constructor(iVXjs) {
        this.restrict = 'A';
        this.controller = ["iVXjs", (iVXjs) => {

        }];
        this.link = ($scope, iElm, iAttrs, controller) => {
            iElm[0].addEventListener('click', (event) => {
                let { ivxRemoveClasses } = iAttrs;
                try{
                    const eventObj = $scope.$eval(ivxRemoveClasses);

                    if(angular.isObject(eventObj)){
                        iVXjs.experience.removeClasses(eventObj);
                    }

                } catch(e){
                   iVXjs.log.error({message : `Can't fire event due attribute not being a valid object. Please check your template definition for 'ivx-remove-classes'.`})
                }
            }, false);
        }
    }

}

RemoveClasses.$inject = ['iVXjs'];

export default angular
    .module('ivx-js.directives.template.remove-classes', [])
    .directive('ivxRemoveClasses', createFactoryFunction(RemoveClasses))
    .name;