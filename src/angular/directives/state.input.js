import createFactoryFunction from '../utilities/create-factory-function.js';
import InputStateController from '../controllers/state.input.js';
import AudioEventNames from "../../constants/audio.events.js";

class InputState {
    constructor($state, $compile, $sce, iVXjs, iVXjsActions, iVXjsUIModule, pullInTemplate, iVXjsBus, ivxExperienceScope) {
        this.template = this.templateHTML;
        this.replace = true;
        this.restrict = 'E';
        this.scope = {}
        this.controller = InputStateController;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            let { data } = $state.current;
            let { headerHTML, footerHTML = '', onInputReady = [], form: formSettings = {}, header = {}, footer = {}, audio } = data;
            let audioEventNames = new AudioEventNames();
            let formSection = `<ivxjs-form-input inputs='vm.inputs' form-id='vm.id' on-submit='vm.onSubmit' form-settings="vm.formSettings"></ivxjs-form-input>`;

            data = pullInTemplate.convertHeaderFooter(header, footer, data, controller);

            let inputStateFramework = new iVXjsUIModule.states.input(formSection, data);

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);
            controller.formSettings = formSettings;

            iElm.html(inputStateFramework.html);
            $compile(iElm.contents())($scope, (compiled) => {
                if (iVXjsUIModule.initializeInput) {
                    iVXjsUIModule.initializeInput();
                };

                let hasTransition = onInputReady.find((event, index) => {
                    return event.eventName === "animateElement" && event.args.element === ".input-state-container";
                });

                iElm.html(compiled)

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
            });
        }
    }

    get templateHTML() {
        return `<div class="input-state-container"></div>`;
    };
}

InputState.$inject = ['$state', '$compile', '$sce', 'iVXjs', 'ivxjs.actions', 'ivxjs.modules.ui', 'pullInTemplate', 'ivxjs.bus', "ivxExperienceScope"];

export default createFactoryFunction(InputState);