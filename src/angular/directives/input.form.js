import createFactoryFunction from '../utilities/create-factory-function.js';
import FormInputController from '../controllers/input.form.js';

class FormInput {
    constructor($compile, $filter, iVXjsUIModule, pullInTemplate) {
        this.template = this.templateHTML;
        this.restrict = 'E';
        this.scope = {
            inputs: '=inputs',
            formId: '=formId',
            onSubmit: '=onSubmit',
            formSettings: '=formSettings'
        };
        this.controller = FormInputController;
        this.controllerAs = 'vm';
        this.$compile = $compile;
        this.link = ($scope, iElm, iAttrs, controller) => {
            let shouldHideSubmit = (inputs, type, attributes) => {
                let hideSubmitOnType = {
                    buttons: true
                };

                return hideSubmitOnType[type];
            };
            let hideSubmit = false;
            let { inputs, formSettings = {}, formId } = $scope;
            let formInputs = inputs.map((input, index) => {
                let { type, attributes, settings = {}, id } = input;
                
                hideSubmit = shouldHideSubmit(inputs, type, attributes);

                return {
                    html: `<ivxjs-${type}-input class="ivxjs-grid-1-1" id="${id}" input-data='inputs[${index}]'></ivxjs-${type}-input>\n`,
                    settings: settings,
                    input
                }
            });

            formSettings = pullInTemplate.convertLabel('', formSettings, $scope);
            formSettings.submit = pullInTemplate.convertLabel('Submit', formSettings.submit, $scope);
            formSettings.submit.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(formSettings.submit.beforeHtml, $scope);
            formSettings.submit.afterHtml = pullInTemplate.convertTemplateUrlToHtml(formSettings.submit.afterHtml, $scope);
            formSettings.hideSubmit = hideSubmit;
            formSettings.id = formId;

            let additionalTagHTML = `ng-submit="vm.onSubmit($event)"`
            let thisFormInputs = new iVXjsUIModule.form(
                formInputs,
                'formInput',
                additionalTagHTML,
                formSettings
            );

            iElm.html(thisFormInputs.html);

            $compile(iElm.contents())($scope);
        }
    }

    get templateHTML() {
        return ``;
    };
}

FormInput.$inject = ['$compile', '$filter', 'ivxjs.modules.ui', 'pullInTemplate'];

export default angular
    .module('ivx-js.directives.input.form', [])
    .directive('ivxjsFormInput', createFactoryFunction(FormInput))
    .name;
