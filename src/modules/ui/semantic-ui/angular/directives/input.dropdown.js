import createFactoryFunction from '../../../../../angular/utilities/create-factory-function.js';
import DropdownInputController from '../controllers/input.dropdown.js';
import { ErrorMessages } from '../../../../../angular/utilities/messages.error.js';

class DropdownInput {
    constructor($rootScope, $compile, $filter, $timeout, iVXjs, iVXjsUIModule, iVXjsBus) {
        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.scope = {
            inputData: '=inputData'
        };
        this.controller = DropdownInputController;
        this.controllerAs = 'vm';
        this.replace = true;
        this.link = ($scope, iElm, iAttrs, controller) => {
            let {inputData: input} = $scope;
            let {id, errors = {}, name, labelHTML, label = $filter('stringParsers')('startCase', id), attributes = {}, options, defaultDisplay, defaultValue, settings = {}} = input;
            let {directives = ''} = settings;
            let errorMessages = new ErrorMessages(name, errors, attributes);
            let defaultOptionTag = `<option value="">Select an option...</option>`;            
            let tagHTML = `${directives}
                           ng-change='vm.onChange(vm.selected)'
                           ng-options="option.display for option in inputData.options track by option.value" 
                           ng-model='vm.selected'`;


            if (attributes.required || defaultDisplay) {
                defaultOptionTag = defaultDisplay ?
                    `<option value="">${defaultDisplay}</option>` :
                    defaultOptionTag;
            }

            let optionsClass = new iVXjsUIModule.dropdown(id, name, label = labelHTML ? labelHTML : label, defaultDisplay, settings, tagHTML, errorMessages);

            iElm.html(optionsClass.html);
            
            if (typeof $ !== 'undefined') {

            }

            $compile(iElm.contents())($scope);
            $(iElm.find('select')).dropdown();
            $timeout(() => {
                let experienceValue = iVXjs.experience.data[name];
                $(iElm.find('select')).dropdown('set selected', experienceValue ? experienceValue  :'');

            }, 0);
        };
    }

    get templateHTML() {
        return `<div></div>`
    };
}

DropdownInput.$inject = ['$rootScope', '$compile', '$filter', '$timeout', 'iVXjs', 'ivxjs.modules.ui', 'ivxjs.bus'];

export default createFactoryFunction(DropdownInput);