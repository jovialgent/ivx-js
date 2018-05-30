import createFactoryFunction from '../utilities/create-factory-function.js';
import CascadingOptionsController from '../controllers/ui.cascading-options.js';
import { ErrorMessages } from '../utilities/messages.error.js';

export class CascadingOptions {
    constructor($compile, $timeout, iVXjs, iVXjsBus, iVXjsUIModule) {
        this.template = this.templateHTML;
        this.restrict = 'E';
        this.scope = {
            inputData: "=inputData"
        }
        this.controller = CascadingOptionsController;
        this.controllerAs = 'vm';
        this.replace = true;

        this.link = ($scope, iElm, iAttrs, controller) => {
            let { inputData: input } = $scope;
            let defaultOptionTag = `Select an option...`;
            let { errors = {}, attributes = {}, settings = {} } = input;
            let { required: cascadeRequired } = attributes;
            let { input: inputSettings = {} } = settings;
            let { displayMap = {} } = inputSettings;
            let tries = 0;


            updateView(controller.viewSettings);

            iVXjsBus.on('update-view', updateTree);

            $scope.$on("$destroy", () => {
                iVXjsBus.removeListener('update-view', updateTree);
            })

            function updateTree(tree) {
                updateView(tree);
            }


            function updateView(tree) {

                if (!tree) {
                    return;
                }

                let { options, labels, isStatic } = tree;
                let html = ``;

                let viewSettings = options.map((selectableOptions, depth, options) => {
                    let label = labels[depth];
                    let defaultDisplay = displayMap[label] ? displayMap[label] : "Select an option....";
                    let thisInput = {
                        id: `${input.id}-${depth}`,
                        options: tree.options[depth],
                        width: input.width,
                        name: `${input.id}-${depth}`,
                        label
                    };
                    let validClass = selectableOptions.length >= 1 ? 'cascade-dropdown-valid' : 'cascade-dropdown-invalid';
                    let OptionErrorMessages = new ErrorMessages(thisInput, errors, attributes);
                    let tagHTML = `
                           ng-change='vm.modelUpdate(vm.currentSelection[${depth}], vm.event)'
                           ng-click="vm.event = $event"
                           ng-options="option.name for option in vm.viewSettings.options[${depth}] track by option.key" 
                           ng-model='vm.currentSelection[${depth}]'`;

                    let uiOptionsObj = {
                        input: thisInput,
                        defaultDisplay,
                        settings: {

                        },
                        tags: tagHTML,
                        errors: OptionErrorMessages
                    };

                    let selectorHTML = new iVXjsUIModule.options(uiOptionsObj).html;
                    let { settings = {} } = input;
                    let { input: inputSettings = {} } = settings;

                    return {
                        html: `<div class='${validClass} ivxjs-grid-1-1'>${selectorHTML}</div>`,
                        settings: inputSettings,
                        inputName: `${input.id}-${depth}`
                    }
                });

                html = `${iVXjsUIModule.style.addWidthClasses(viewSettings)}`;
                iElm.html(html);
                $compile(iElm.contents())($scope);

                $timeout(() => {

                    if (iVXjsUIModule.initializeInput) {
                        iVXjsUIModule.initializeInput();
                    };

                    tries += 1;
                    let isValid = !cascadeRequired;

                    if (cascadeRequired) {

                        viewSettings.forEach((viewSetting, index) => {
                            let { inputName } = viewSetting;
                            let thisSelection = [].concat(controller.currentSelection)[index];
                            let hasSelection = typeof thisSelection !== 'undefined';
                            let hasFormInput = $scope.$parent && $scope.$parent.formInput && $scope.$parent.formInput[inputName];

                            if (hasSelection && thisSelection.items && hasFormInput) {
                                $scope.$parent.formInput[inputName].$setValidity('required', hasSelection);

                            }
                        })
                    }

                }, 1)

            }
        }
    }

    get templateHTML() {
        return "<div></div>";
    }
}

CascadingOptions.$inject = ['$compile', '$timeout', 'iVXjs', 'ivxjs.bus', 'ivxjs.modules.ui'];

export default angular
    .module('ivx-js.directives.ui.cascading-options', [])
    .directive('ivxjsCascadingOptionsInput', createFactoryFunction(CascadingOptions))
    .name;
