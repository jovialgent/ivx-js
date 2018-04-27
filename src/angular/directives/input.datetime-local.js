import createFactoryFunction from '../utilities/create-factory-function.js';
import DateTimeLocalInputController from '../controllers/input.date-time-local.js';
import { ErrorMessages } from '../utilities/messages.error.js';
import { DateParser } from '../utilities/date-parser.js';

class DateTimeLocalInput {
    constructor($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate, ivxExperienceScope) {
        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        }
        this.controller = DateTimeLocalInputController;
        this.controllerAs = 'vm';
        this.link = ($scope, iElm, iAttrs, controller) => {
            let { inputData: input } = $scope;
            let { id, name, errors = {}, labelHTML, label, attributes = {}, settings = {} } = input;

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            input.label = label ? label : $filter('stringParsers')('startCase', id)

            if (attributes.min) {
                let dateMin = new DateParser(attributes.min).formatForDateTimeLocalInput();
                attributes.min = `${dateMin}`;
            }

            if (attributes.max) {
                let dateMax = new DateParser(attributes.max).formatForDateTimeLocalInput();
                attributes.max = `${dateMax}`;
            }

            let errorMessages = new ErrorMessages(input, errors, attributes);
            let tagHTML = `ng-blur="vm.onChange(inputValue)" ng-model="inputValue"`;

            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
            input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);


            let uiDatetimeLocalObj = {
                input: input,
                settings: settings,
                tags: tagHTML,
                errors: errorMessages
            }

            let datetimeLocal = new iVXjsUIModule.datetimeLocal(uiDatetimeLocalObj);

            iElm.html(datetimeLocal.html);
            $compile(iElm.contents())($scope);
        }
    }

    get templateHTML() {
        return `<div></div>`
    };
}

DateTimeLocalInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxExperienceScope'];

export default angular
    .module('ivx-js.directives.input.datetime-local', [])
    .directive('ivxjsDatetimeLocalInput', createFactoryFunction(DateTimeLocalInput))
    .name;