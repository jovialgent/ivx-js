import createFactoryFunction from '../utilities/create-factory-function.js';
// CONTROLLER
// import {[CTRLNAME]} from '[CTRLFILE]';


class AnimateElement {
    constructor(iVXjs, iVXjsActionTemplateService) {
        this.restrict = 'A';
        this.controller = ["iVXjs", (iVXjs) => {

        }];
        this.link = ($scope, iElm, iAttrs, controller) => {
            iVXjsActionTemplateService.setup($scope, iElm, iAttrs, _getAnimateElementEventObj);

            function _getAnimateElementEventObj() {
                const { ivxAnimate: value } = iAttrs;
                const args = extractAnimateArgs(value);

                return {
                    eventName: "animateElement",
                    args
                }
            }

            function extractAnimateArgs(valueString = '') {
                let updatedValue = valueString.trim();
                let parts = updatedValue.split(',');

                parts = parts.map((part, index) => {
                    let newPart = part.trim();

                    newPart = newPart.replace(/[{}\'\"]/g, "");

                    return newPart;
                });

                let element = parts[0];
                let animationClasses = parts[1] === "true" || parts[1] === "false" ? parts[1] === "true" : parts[1];

                return { element, animationClasses };
            }

        }
    }

}

AnimateElement.$inject = ['iVXjs', 'iVXjsActionTemplateService'];

export default angular
    .module('ivx-js.directives.template.animate-element', [])
    .directive('ivxAnimate', createFactoryFunction(AnimateElement))
    .name;
