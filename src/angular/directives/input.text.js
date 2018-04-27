import createFactoryFunction from '../utilities/create-factory-function.js';
import TextInputController from '../controllers/input.text.js';
import { ErrorMessages } from '../utilities/messages.error.js';

class TextInput {
    constructor($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate, ivxExperienceScope) {
        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        }
        this.controller = TextInputController;
        this.controllerAs = 'vm';
        this.link = ($scope, iElm, iAttrs, controller) => {
            let { inputData: input } = $scope;
            let { id, name, errors = {}, labelHTML, label = $filter('stringParsers')('startCase', id), attributes = {}, type, settings = {} } = input;
            let errorMessages = new ErrorMessages(input, errors, attributes);

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);
            
            let tagHTML = `ng-blur="vm.onChange(inputValue)" ng-model="inputValue"`

            input.label = labelHTML ? labelHTML : label;
            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
            input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);

            let uiTextObj = {
                input: input,
                settings: settings,
                tags: tagHTML,
                errors: errorMessages
            };
            let text = new iVXjsUIModule.text(uiTextObj);

            iElm.html(text.html);

            $compile(iElm.contents())($scope);
        }
    }

    get templateHTML() {
        return `<div></div>`;
    };
}

TextInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxExperienceScope'];

export default angular
    .module('ivx-js.directives.input.text', [])
    .directive('ivxjsTextInput', createFactoryFunction(TextInput))
    .name;