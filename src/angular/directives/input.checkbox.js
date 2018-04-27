import createFactoryFunction from '../utilities/create-factory-function.js';
import CheckboxInputController from '../controllers/input.checkbox.js';
import { ErrorMessages } from '../utilities/messages.error.js';

class CheckboxInput {
    constructor($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate,ivxExperienceScope) {
        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        }
        this.controller = CheckboxInputController;
        this.controllerAs = 'vm';
        this.link = ($scope, iElm, iAttrs, controller) => {
            let { inputData: input } = $scope;
            let { id, name, errors = {}, labelHTML, label, attributes = {}, settings = {} } = input;
            let tagHTML = `ng-blur="vm.onChange(inputValue)" ng-model="inputValue"`;

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);
            
            input.label = label ? label : $filter('stringParsers')('startCase', id);
            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
<<<<<<< HEAD
            input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
            input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);
=======
>>>>>>> 66edc35f03aabb01d344fb2918a33d29056022f9

            let checkboxUIObj = {
                input: input,
                tags: tagHTML,
                settings: settings,
                errors: new ErrorMessages(input, errors, attributes)
            };
            let checkBox = new iVXjsUIModule.checkbox(checkboxUIObj);

            iElm.html(checkBox.html);

            $compile(iElm.contents())($scope);
        }
    }

    get templateHTML() {
        return `<div></div>`;
    }
}

CheckboxInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxExperienceScope'];

export default angular
    .module('ivx-js.directives.input.checkbox', [])
    .directive('ivxjsCheckboxInput', createFactoryFunction(CheckboxInput))
    .name;
