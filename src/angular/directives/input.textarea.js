import createFactoryFunction from '../utilities/create-factory-function.js';
import TextAreaInputController from '../controllers/input.textarea.js';
import { ErrorMessages } from '../utilities/messages.error.js';

class TextAreaInput {
    constructor($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate, ivxExperienceScope) {
        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        }
        this.controller = TextAreaInputController;
        this.controllerAs = 'vm';
        this.link = ($scope, iElm, iAttrs, controller) => {
            let { inputData: input } = $scope;
            let { id, name, errors = {}, labelHTML, label, attributes = {}, type, settings = {} } = input;
            let errorMessages = new ErrorMessages(input, errors, attributes);
            let tagHTML = `ng-blur="vm.onChange(inputValue, $event)" ng-model="inputValue"`;

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            input.label = label ? label : $filter('stringParsers')('startCase', id);
            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
            input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);

            let uiTextareaObj = {
                input: input,
                settings: settings,
                tags: tagHTML,
                errors: errorMessages
            };
            let textarea = new iVXjsUIModule.textarea(uiTextareaObj);

            iElm.html(textarea.html);
            $compile(iElm.contents())($scope);
        }
    }

    get templateHTML() {
        return `<div></div>`;
    };
}

TextAreaInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxExperienceScope'];

export default angular
    .module('ivx-js.directives.input.textarea', [])
    .directive('ivxjsTextareaInput', createFactoryFunction(TextAreaInput))
    .name;
