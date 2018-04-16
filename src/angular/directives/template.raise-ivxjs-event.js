import createFactoryFunction from '../utilities/create-factory-function.js';
// CONTROLLER
// import {[CTRLNAME]} from '[CTRLFILE]';

class RaiseiVXjsEvent {
    constructor(iVXjs, iVXjsActionTemplateService) {
        this.restrict = 'A';
        this.controller = ["iVXjs", (iVXjs) => {

        }];
        this.link = ($scope, iElm, iAttrs, controller) => {
            iVXjsActionTemplateService.setup($scope, iElm, iAttrs, _getRaiseEventEventObj);

            function _getRaiseEventEventObj() {
                const { ivxEventArgs: value = {}, ivxEvent: eventName } = iAttrs;

                try {
                    const args = $scope.$eval(value);

                    return {
                        eventName,
                        args
                    }
                } catch (e) {
                    iVXjs.log.error({ message: `Can't fire event due attribute not being a valid object. Please check your template definition for 'ivx-event-args'.` })
                }
            }
        }
    }

}

RaiseiVXjsEvent.$inject = ['iVXjs', 'iVXjsActionTemplateService'];

export default angular
    .module('ivx-js.directives.template.raise-ivx-event', [])
    .directive('ivxEvent', createFactoryFunction(RaiseiVXjsEvent))
    .name;
