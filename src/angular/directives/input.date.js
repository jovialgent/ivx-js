import createFactoryFunction from '../utilities/create-factory-function.js';
import DateInputController from '../controllers/input.date.js';
import { ErrorMessages } from '../utilities/messages.error.js';
import { DateParser } from '../utilities/date-parser.js';

class DateInput {
    constructor($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate) {
        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        }
        this.controller = DateInputController;
        this.controllerAs = 'vm';
        this.link = ($scope, iElm, iAttrs, controller) => {
            let { inputData: input } = $scope;
            let { id, name, errors = {}, labelHTML, label, attributes = {}, settings = {} } = input;

            if (attributes.min) {
                let dateMin = new DateParser(attributes.min).formatForDateInput();

                attributes.min = `${dateMin}`;
            }

            if (attributes.max) {
                let dateMax = new DateParser(attributes.max).formatForDateInput();

                attributes.max = `${dateMax}`;
            }

            input.label = label ? label : $filter('stringParsers')('startCase', id);

            let errorMessages = new ErrorMessages(input, errors, attributes);

            $scope.inputValue = iVXjs.experience.data[name] ? iVXjs.experience.data[name] : '';

            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
            input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);


            let tagHTML = `ng-blur="vm.onChange(inputValue)" ng-model="inputValue"`;
            let uiDateObj = {
                input: input,
                settings: settings,
                tags: tagHTML,
                errors: errorMessages
            }
            let date = new iVXjsUIModule.date(uiDateObj);

            iElm.html(date.html);
            $compile(iElm.contents())($scope);
        }
    }

    get templateHTML() {
        return `<div></div>`
    };
}

DateInput.$inject = ['$compile', '$filter', 'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate'];

export default angular
    .module('ivx-js.directives.input.date', [])
    .directive('ivxjsDateInput', createFactoryFunction(DateInput))
    .name;