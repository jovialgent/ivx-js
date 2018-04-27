import createFactoryFunction from '../utilities/create-factory-function.js';
// CONTROLLER
// import {[CTRLNAME]} from '[CTRLFILE]';


class SetData {
    constructor(iVXjs) {
        this.restrict = 'A';
        this.controller = ["iVXjs", (iVXjs) => {

        }];
        this.link = ($scope, iElm, iAttrs, controller) => {
            iElm[0].addEventListener('click', (event) => {
                event.preventDefault();
                let { ivxSetData: value } = iAttrs;
                let keyValue = extractKeyValue(value);

                if (iVXjs.actions && iVXjs.actions.setData) {
                    iVXjs.actions.setData(keyValue);
                } else {
                    iVXjs.experience.setData(keyValue);
                }
            }, false);


            function extractKeyValue(valueString) {
                let updatedValue = valueString.trim();
                let parts = updatedValue.split(',');

                parts = parts.map((part, index) => {
                    let newPart = part.trim();

                    newPart = newPart.replace(/[{}]/g, "");

                    if (index === 0) {
                        newPart = newPart.replace(/[\'\"]/g, "");
                    }

                    return newPart;
                });

                let key = parts[0];
                let value = parts[1] === "true" || parts[1] === "false" ? parts[1] === "true" : parts[1];

                return { key, value };
            }
        }
    }

}

SetData.$inject = ['iVXjs'];

export default angular
    .module('ivx-js.directives.template.set-data', [])
    .directive('ivxSetData', createFactoryFunction(SetData))
    .name;