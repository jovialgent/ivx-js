import createFactoryFunction from '../utilities/create-factory-function.js';
import ButtonInputController from '../controllers/input.buttons.js';
import { ErrorMessages } from '../utilities/messages.error.js';

class ButtonsInput {
    constructor($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate, ivxExperienceScope) {
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
            let { inputData: input } = $scope;
            let { id, name, labelHTML, label = '', errors = { required: 'Must click to continue.' }, skip = { label: "Skip" }, buttons, attributes = {}, settings = {} } = input;
            let inputButtonData = buttons.map((button, index) => {
                button = pullInTemplate.convertLabel(button.value, button, $scope);

                let { label, labelHTML, value, classes = '', id: buttonId } = button;

                label = labelHTML ? labelHTML : label;

                return {
                    id: buttonId,
                    label: label,
                    attrHTML: `ng-click='vm.onClick($event, vm.buttons[${index}])'`,
                    classes: classes,
                    value

                }
            });

            $scope = ivxExperienceScope.setScopeExperience($scope);

            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
            input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);

            if (!attributes.required) {
                skip = pullInTemplate.convertLabel('Skip', skip, $scope);

                let { label, labelHTML, value, classes = '' } = skip;

                label = labelHTML ? labelHTML : label;

                inputButtonData.push({
                    label,
                    classes
                })
            };

            let dataUIObj = {
                buttons: inputButtonData,
                input: input,
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

ButtonsInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxExperienceScope'];

export default angular
    .module('ivx-js.directives.input.button', [])
    .directive('ivxjsButtonsInput', createFactoryFunction(ButtonsInput))
    .name;