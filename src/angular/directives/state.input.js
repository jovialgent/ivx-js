import createFactoryFunction from '../utilities/create-factory-function.js';
import InputStateController from '../controllers/state.input.js';

class InputState {
    constructor($state, $compile, $sce, iVXjs, iVXjsActions, iVXjsUIModule, pullInTemplate) {
        this.template = this.templateHTML;
        this.replace = true;
        this.restrict = 'E';
        this.scope = {}
        this.controller = InputStateController;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            let {data} = $state.current;
            let {headerHTML, footerHTML = '', onInputReady = [], form : formSettings = {}, header = {}, footer = {}} = data;
            let formSection = `<ivxjs-form-input inputs='vm.inputs' form-id='vm.id' on-submit='vm.onSubmit' form-settings="vm.formSettings"></ivxjs-form-input>`;
            
            data = pullInTemplate.convertHeaderFooter(header, footer, data, controller);

            let inputStateFramework = new iVXjsUIModule.states.input(formSection, data);
            
            $scope.experience = iVXjs.experience.data;  
            controller.formSettings = formSettings;
            
            iElm.html(inputStateFramework.html);
            $compile(iElm.contents())($scope);
        }
    }

    get templateHTML() {
        return `<div class="input-state-container"></div>`;
    };
}

InputState.$inject = ['$state', '$compile', '$sce', 'iVXjs', 'ivxjs.actions', 'ivxjs.modules.ui', 'pullInTemplate'];

export default createFactoryFunction(InputState);