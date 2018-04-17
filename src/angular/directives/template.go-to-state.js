import createFactoryFunction from '../utilities/create-factory-function.js';
// CONTROLLER
// import {[CTRLNAME]} from '[CTRLFILE]';


class GoToState {
    constructor(iVXjs, iVXjsBus) {
        this.restrict = 'A';
        this.controller = ["iVXjs", (iVXjs) => {

        }];
        this.link = ($scope, iElm, iAttrs, controller) => {
            iElm[0].addEventListener('click', (event) => {
                event.preventDefault();

                let { ivxGoToState: stateId } = iAttrs;

                iVXjs.experience.goToState({ stateId }, iVXjsBus);
            }, false);
        }
    }

}

GoToState.$inject = ['iVXjs', 'ivxjs.bus'];

export default angular
    .module('ivx-js.directives.template.go-to-state', [])
    .directive('ivxGoToState', createFactoryFunction(GoToState))
    .name;