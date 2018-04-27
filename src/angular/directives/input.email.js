import createFactoryFunction from '../utilities/create-factory-function.js';
import EmailInputController from '../controllers/input.email.js';
import { ErrorMessages } from '../utilities/messages.error.js';

class EmailInput {
    constructor($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate, ivxExperienceScope) {
        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        }
        this.controller = EmailInputController;
        this.controllerAs = 'vm';
        this.link = ($scope, iElm, iAttrs, controller) => {
            let { inputData: input } = $scope;
            let { id, name, errors = {}, labelHTML, label, attributes = {}, type, settings = {} } = input;
            let errorMessages = new ErrorMessages(input, errors, attributes);
            let tagHTML = `ng-blur="vm.onChange(inputValue)" ng-model="inputValue"`;

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);
            
            input.label = label ? label : $filter('stringParsers')('startCase', id);
            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);

            let uiEmailObj = {
                input: input,
                settings: settings,
                tags: tagHTML,
                errors: errorMessages
            }
            let email = new iVXjsUIModule.email(uiEmailObj);


            iElm.html(email.html);
            $compile(iElm.contents())($scope);
        }
    }

    get templateHTML() {
        return `<div></div>`;
    };
}

EmailInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxExperienceScope'];

export default angular
    .module('ivx-js.directives.input.email', [])
    .directive('ivxjsEmailInput', createFactoryFunction(EmailInput))
    .name;