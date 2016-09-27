import createFactoryFunction from '../utilities/create-factory-function.js';
import StateData from '../utilities/state-data.js';
import AudioEventNames from "../../constants/audio.events.js";


class InputStateController {
    constructor($state, $scope, $rootScope, $timeout, iVXjsActions, iVXjsBus, iVXjsUIModule) {
        let thisStateDataClass = new StateData($state);
        let {inputs, id, headerHTML, footerHTML, name, next = [], onSubmit = [], onInputReady = [], audio} = thisStateDataClass.stateData;
        let audioEventNames = new AudioEventNames();

        this.inputs = inputs;
        this.id = id;
        this.stateID = id;
        this.onSubmit = (formInput) => {
            if (formInput && formInput.$valid) {
                iVXjsActions.resolveThenNavigate(onSubmit, next);
            }
        };

        $timeout(() => {
            if (iVXjsUIModule.initializeInput) {
                iVXjsUIModule.initializeInput();
            };

            let hasTransition = onInputReady.find((event, index) =>{
                return event.eventName === "animateElement" && event.args.element === ".input-state-container";
            });

            if(!hasTransition){
                onInputReady.push({
                    eventName : "animateElement",
                    args : {
                        element : ".input-state-container",
                        animationClasses : "show"
                    }
                })
            }

            iVXjsActions.resolveActions(onInputReady, () => {
                if (audio && audio.src) {
                    iVXjsBus.emit(audioEventNames.PLAY);
                }
            })
        }, 1);
    }
}

InputStateController.$inject = ['$state', '$scope', '$rootScope', '$timeout', 'ivxjs.actions', 'ivxjs.bus', 'ivxjs.modules.ui'];

export default createFactoryFunction(InputStateController);