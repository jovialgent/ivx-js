import createFactoryFunction from '../utilities/create-factory-function.js';
// CONTROLLER
// import {[CTRLNAME]} from '[CTRLFILE]';


class GoToState {
    constructor(iVXjs, iVXjsBus, iVXjsActionTemplateService) {
        this.restrict = 'A';
        this.controller = ["iVXjs", (iVXjs) => {

        }];
        this.link = ($scope, iElm, iAttrs, controller) => {
            iVXjsActionTemplateService.setup($scope, iElm, iAttrs, _getiVXGoToStateEventObj);

            function _getiVXGoToStateEventObj() {
                let { ivxGoToState: stateId } = iAttrs;
                const { GO: eventName } = iVXjs.constants.STATE.EVENTS;

                return {
                    eventName,
                    args: { stateId }
                }
            }
        }
    }

}

GoToState.$inject = ['iVXjs', 'ivxjs.bus', 'iVXjsActionTemplateService'];

export default angular
    .module('ivx-js.directives.template.go-to-state', [])
    .directive('ivxGoToState', createFactoryFunction(GoToState))
    .name;