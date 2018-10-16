import createFactoryFunction from '../utilities/create-factory-function.js';
import RadioInputController from '../controllers/input.radio.js';
import { ErrorMessages } from '../utilities/messages.error.js';

class RadioInput {
    constructor($compile, $filter, iVXjs, iVXjsUIModule, pullInTemplate, ivxExperienceScope) {
        this.template = this.templateHTML;
        this.transclude = true;
        this.restrict = 'E';
        this.require = "^ivxjsFormInput";
        this.replace = true;
        this.scope = {
            inputData: '=inputData'
        }
        this.controller = RadioInputController;
        this.controllerAs = 'vm';
        this.link = ($scope, iElm, iAttrs, controller) => {
            let { inputData: input } = $scope;
            let { id, errors = {}, name, labelHTML, label, attributes = {}, radioButtons = [], settings = {} } = input;
            let radioErrorRequired = '';

            $scope = ivxExperienceScope.setScopeExperience($scope);
            
            if (attributes.required) {
                radioErrorRequired = `required="!radioSelected"`;
            }

            input.label = label ? label : $filter('stringParsers')('startCase', id);
            input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
            input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
            input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);

            let errorMessages = new ErrorMessages(input, errors, attributes);
            let inputRadioButtonData = radioButtons.map((radioButton, index) => {
                radioButton = pullInTemplate.convertLabel('', radioButton, $scope);

                let { label, labelHTML, value, classes = '' } = radioButton;

                if (labelHTML) label = labelHTML;

                return {
                    label: label,
                    attrHTML: `ng-click='vm.onChange(radioSelected, $event)' ng-model='radioSelected' value='${value}' ${radioErrorRequired}`,
                    classes: classes

                }
            });

            let uiRadioObj = {
                input: input,
                radios: inputRadioButtonData,
                errors: errorMessages,
                settings: settings,
            };
            let thisRadiosInput = new iVXjsUIModule.radio(uiRadioObj);

            iElm.html(thisRadiosInput.html)
            $compile(iElm.contents())($scope);
        }
    }

    get templateHTML() {
        return `<div></div>`;
    };
}

RadioInput.$inject = ['$compile', '$filter',  'iVXjs', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxExperienceScope'];


export default angular
    .module('ivx-js.directives.input.radio', [])
    .directive('ivxjsRadioInput', createFactoryFunction(RadioInput))
    .name;