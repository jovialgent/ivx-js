import createFactoryFunction from '../utilities/create-factory-function.js';
import ButtonInputController from '../controllers/input.buttons.js';
import { ErrorMessages } from '../utilities/messages.error.js';

class ButtonsInput {
    constructor($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate) {
        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        }
        this.controller = ButtonInputController;
        this.controllerAs = 'vm';
        this.link = ($scope, iElm, iAttrs, controller) => {
            let {inputData: input} = $scope;
            let {id, name, labelHTML, label = '', errors = { required: 'Must click to continue.' }, skipSettings = { label: "Skip" }, buttons, attributes = {}, settings = {}} = input;            
            let inputButtonData = buttons.map((button, index) => {
                button = pullInTemplate.convertLabel(button.value, button, $scope);
                
                let buttonString = angular.toJson(button);
                let {label, labelHTML, value, classes = ''} = button;

                label = labelHTML ? labelHTML : label;

                return {
                    label: label,
                    attrHTML: `ng-click='vm.onClick($event, ${buttonString})'`,
                    classes: classes

                }
            });

            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            
            if (!attributes.required) {
                let {label, labelHTML, value, classes = ''} = skipSettings;
                
                label = labelHTML ? labelHTML : label;
                
                inputButtonData.push({
                    label: label,
                    classes : classes,
                    attrHTML : ''
                })
            };
            
            let dataUIObj = {
                buttons : inputButtonData,
                input : input,
                errors: new ErrorMessages(name, errors, attributes),
            };
            let thisButtonsInput = new iVXjsUIModule.buttons(inputButtonData, input);
            let inputContainer = iElm.find('div');
            
            controller.iVXjs = iVXjs;
            
            iElm.html(thisButtonsInput.html);
            $compile(iElm.contents())($scope);
        }
    }

    get templateHTML() {
        return `<div></div>`
    }
}

ButtonsInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate'];

export default createFactoryFunction(ButtonsInput);