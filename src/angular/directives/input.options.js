import createFactoryFunction from '../utilities/create-factory-function.js';
import OptionsInputController from '../controllers/input.options.js';
import { ErrorMessages } from '../utilities/messages.error.js';

class OptionsInput {
    constructor($compile, $filter, iVXjs, iVXjsUIModule, iVXjsBus, pullInTemplate, ivxExperienceScope) {
        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.scope = {
            inputData: '=inputData'
        }

        this.controller = OptionsInputController;
        this.controllerAs = 'vm';
        this.replace = true;
        this.link = ($scope, iElm, iAttrs, controller) => {
            let { inputData: input } = $scope;
            let { id, errors = {}, name, labelHTML, attributes = {}, options, defaultDisplay, settings = {} } = input;
            let { directives = '' } = settings;
            let errorMessages = new ErrorMessages(input, errors, attributes);
            let defaultOptionTag = `<option value="">Select an option...</option>`;
            let tagHTML = `${directives}
                           ng-change='vm.onChange(vm.selected.value, event)'
                           ng-click="event = $event"
                           ng-options="option.display for option in inputData.options track by option.value" 
                           ng-model='vm.selected'`;

            $scope = ivxExperienceScope.setScopeExperience($scope);

            input.label = input.label ? input.label : $filter('stringParsers')('startCase', id);
            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
            input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);


            if (attributes.required || defaultDisplay) {
                defaultOptionTag = defaultDisplay ?
                    `<option value="">${defaultDisplay}</option>` :
                    defaultOptionTag;
            }

            let uiOptionsObj = {
                input: input,
                defaultDisplay: defaultDisplay,
                settings: settings,
                tags: tagHTML,
                errors: errorMessages

            };
            let optionsClass = new iVXjsUIModule.options(uiOptionsObj);

            iElm.html(optionsClass.html);
            $compile(iElm.contents())($scope);
        }
    }

    get templateHTML() {
        return `<div></div>`;
    };
}

OptionsInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'ivxjs.bus', 'pullInTemplate', 'ivxExperienceScope'];

export default angular
    .module('ivx-js.directives.input.options', [])
    .directive('ivxjsOptionsInput', createFactoryFunction(OptionsInput))
    .name;