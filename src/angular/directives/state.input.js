import createFactoryFunction from '../utilities/create-factory-function.js';
import InputStateController from '../controllers/state.input.js';
import AudioEventNames from "../../constants/audio.events.js";

class InputState {
    constructor($state, $compile, $sce, $timeout, iVXjs, iVXjsActions, iVXjsUIModule, pullInTemplate, iVXjsBus, ivxExperienceScope, iVXjsStateGenerator) {
        this.template = this.templateHTML;
        this.replace = true;
        this.restrict = 'E';
        this.scope = {
            stateData: "="
        }
        this.controller = InputStateController;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            let data = angular.copy($scope.stateData);
            let { headerHTML, footerHTML = '', onInputReady = [], form: formSettings = {}, header = {}, footer = {}, audio, embedded = false, embeddedViews = [] } = data;
            let audioEventNames = new AudioEventNames();
            let formSection = `<ivxjs-form-input inputs='vm.inputs' form-id='vm.id' on-submit='vm.onSubmit' form-settings="vm.formSettings"></ivxjs-form-input>`;

            data = pullInTemplate.convertHeaderFooter(header, footer, data, controller);

            let inputStateFramework = new iVXjsUIModule.states.input(formSection, data);

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);
            controller.formSettings = formSettings;

            iElm.html(inputStateFramework.html);

            if (!embedded && embeddedViews.length > 0) {
                iVXjsStateGenerator.addViews(embeddedViews, iElm);
            }

            $compile(iElm.contents())($scope, (compiled) => {
                if (window.$) {
                    iElm.html(compiled);
                    showState();
                    return;
                }

                compiled.ready(() => {
                    const [text, compiledNode] = compiled;

                    iElm.html(compiledNode.innerHTML);
                    showState();
                });
            });



            function showState() {
                if (iVXjsUIModule.initializeInput) {
                    iVXjsUIModule.initializeInput();
                };

                let hasTransition = onInputReady.find((event, index) => {
                    return event.eventName === "animateElement" && event.args.element === ".input-state-container";
                });

                // iElm.html(compiled);

                if (!hasTransition) {
                    onInputReady.push({
                        eventName: "animateElement",
                        args: {
                            element: ".input-state-container",
                            animationClasses: "show"
                        }
                    })
                }

                iVXjs.log.debug(`onInputReady Started`, {}, { state: data, source: 'onInputReady', status: 'started', actions: onInputReady, timestamp: Date.now() });

                iVXjsActions.resolveActions(onInputReady, () => {
                    iVXjs.log.debug(`onInputReady Completed`, {}, { state: data, source: 'onInputReady', status: 'completed', actions: onInputReady, timestamp: Date.now() });

                    if (audio && audio.src) {
                        iVXjsBus.emit(audioEventNames.PLAY);
                    }
                })
            }
        }
    }

    get templateHTML() {
        return `<div class="input-state-container"></div>`;
    };
}

InputState.$inject = ['$state', '$compile', '$sce', '$timeout', 'iVXjs', 'ivxjs.actions', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxjs.bus', "ivxExperienceScope", "iVXjsStateGenerator"];

export default angular
    .module('ivx-js.directives.state.input', [])
    .directive('ivxjsInputState', createFactoryFunction(InputState))
    .name;