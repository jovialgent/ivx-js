import createFactoryFunction from '../utilities/create-factory-function.js';
import NumberInputController from '../controllers/input.number.js';
import { ErrorMessages } from '../utilities/messages.error.js';

class NumberInput {
    constructor($compile, $filter, iVXjsUIModule, pullInTemplate) {
        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        }
        this.controller = NumberInputController;
        this.controllerAs = 'vm';
        this.link = ($scope, iElm, iAttrs, controller) => {
            let { inputData: input } = $scope;
            let { id, name, errors = {}, labelHTML, label, attributes = {}, type, settings = {} } = input;
            let errorMessages = new ErrorMessages(input, errors, attributes);
            let tagHTML = `ng-blur="vm.onChange(inputValue)" ng-model="inputValue"`;

            input.label = label ? label : $filter('stringParsers')('startCase', id);
            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
            input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);

            let uiNumberObj = {
                input: input,
                settings: settings,
                tags: tagHTML,
                errors: errorMessages
            };
            let number = new iVXjsUIModule.number(uiNumberObj);

            iElm.html(number.html);
            $compile(iElm.contents())($scope);
        }
    }

    get templateHTML() {
        return `<div></div>`;
    };
}

NumberInput.$inject = ['$compile', '$filter', 'ivxjs.modules.ui', 'pullInTemplate'];

export default angular
    .module('ivx-js.directives.input.number', [])
    .directive('ivxjsNumberInput', createFactoryFunction(NumberInput))
    .name;