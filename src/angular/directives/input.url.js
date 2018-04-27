import createFactoryFunction from '../utilities/create-factory-function.js';
import UrlInputController from '../controllers/input.url.js';
import { ErrorMessages } from '../utilities/messages.error.js';

class UrlInput {
    constructor($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate, ivxExperienceScope) {
        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        }
        this.controller = UrlInputController;
        this.controllerAs = 'vm';
        this.link = ($scope, iElm, iAttrs, controller) => {
            let { inputData: input } = $scope;
            let { id, name, errors = {}, labelHTML, label, attributes = {}, type, settings = {} } = input;
            let errorMessages = new ErrorMessages(input, errors, attributes);
            let tagHTML = `ng-blur="vm.onChange(inputValue)" ng-model="inputValue"`;

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            input.label = label ? label : $filter('stringParsers')('startCase', id);
            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);

            let uiUrlObj = {
                input: input,
                settings: settings,
                tags: tagHTML,
                errors: errorMessages
            };
            let url = new iVXjsUIModule.url(uiUrlObj);

            iElm.html(url.html);
            $compile(iElm.contents())($scope);
        }
    }

    get templateHTML() {
        return `<div></div>`;
    };
}

UrlInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxExperienceScope'];

export default angular
    .module('ivx-js.directives.input.url', [])
    .directive('ivxjsUrlInput', createFactoryFunction(UrlInput))
    .name;
