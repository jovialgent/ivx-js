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
            let {inputData: input} = $scope;
            let defaultOptionTag = `Select an option...`;

            updateView(controller.tree);

            iVXjsBus.on('update-view', (tree) => {
                updateView(tree);
            });

            function updateView(tree) {

                let { options, labels } = tree;
                let html = ``;

                html = options.map((selectableOptions, depth, options) => {

                    let label = labels[depth];
                    let tagHTML = `
                           ng-change='vm.modelUpdated(vm.currentSelection[${depth}])'
                           ng-options="option.name for option in vm.tree.options[${depth}] track by option.key" 
                           ng-model='vm.currentSelection[${depth}]'`;

                    let uiOptionsObj = {
                        input: {
                            id: `${input.id}-${depth}`,
                            options: selectableOptions,
                            width: input.width,
                            label,
                        },
                        defaultDisplay: label,
                        settings: {},
                        tags: tagHTML,
                        errors: {}
                    };

                    let selectorHTML = new iVXjsUIModule.options(uiOptionsObj).html;
                    let {settings = {}} = input;
                    let {input : inputSettings = {}} = settings;

                    return {
                        html: `<div class='ivxjs-grid-1-1'>${selectorHTML}</div>`,
                        settings: inputSettings
                    }
                });

                html = `${iVXjsUIModule.style.addWidthClasses(html)}`;

                iElm.html(html);
                $compile(iElm.contents())($scope);

                $timeout(() => {
                    if (iVXjsUIModule.initializeInput) {
                        iVXjsUIModule.initializeInput();
                    };
                }, 1)

            }
        }
    }

    get templateHTML() {
        return "<div></div>";
    }
}

CascadingOptions.$inject = ['$compile', '$timeout', 'iVXjs', 'ivxjs.bus', 'ivxjs.modules.ui'];

export default createFactoryFunction(CascadingOptions);
