import createFactoryFunction from '../../../../../angular/utilities/create-factory-function.js';
import PasswordInputController from '../controllers/input.password.js';
import { ErrorMessages } from '../../../../../angular/utilities/messages.error.js';

class PasswordInput {
    constructor($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate) {
        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        }
        this.controller = PasswordInputController;
        this.controllerAs = 'vm';
        this.link = ($scope, iElm, iAttrs, controller) => {
            let {inputData: input} = $scope;
            let {id, name, errors = {}, labelHTML, label = $filter('stringParsers')('startCase', id), attributes = {}, type, settings = {}} = input;
            let errorMessages = new ErrorMessages(input, errors, attributes);
            let tagHTML = `ng-change="vm.setPassword(inputValue)" ng-model="inputValue"`

            input.label = labelHTML ? labelHTML : label;
            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            
            let uiPasswordObj = {
                input: input,
                settings: settings,
                tags: tagHTML,
                errors: errorMessages
            };
            let password = new iVXjsUIModule.password(uiPasswordObj);

            iElm.html(password.html);

            $compile(iElm.contents())($scope);
        }
    }

    get templateHTML() {
        return `<div></div>`;
    };
}

PasswordInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate'];

export default createFactoryFunction(PasswordInput);