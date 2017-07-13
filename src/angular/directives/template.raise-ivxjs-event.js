import createFactoryFunction from '../utilities/create-factory-function.js';
// CONTROLLER
// import {[CTRLNAME]} from '[CTRLFILE]';

class RaiseiVXjsEvent {
    constructor(iVXjs, iVXjsBus) {
        this.restrict = 'A';
        this.scope = {
            ivxEventArgs: "=ivxEventArgs",
            ivxEvent: "@ivxEvent"
        }
        this.controller = ["iVXjs", (iVXjs) => {

        }];
        this.link = ($scope, iElm, iAttrs, controller) => {
            iElm[0].addEventListener('click', (event) => {
                event.preventDefault();

                let { ivxEventArgs: args = {}, ivxEvent: eventName } = $scope;

                iVXjsBus.emit(eventName, args);
            }, false);
        }
    }

}

RaiseiVXjsEvent.$inject = ['iVXjs', 'ivxjs.bus'];

export default createFactoryFunction(RaiseiVXjsEvent);
