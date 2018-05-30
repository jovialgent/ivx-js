import createFactoryFunction from '../utilities/create-factory-function.js';
import StateData from '../utilities/state-data.js';
import AudioEventNames from "../../constants/audio.events.js";


class InputStateController {
    constructor($state, $scope, $rootScope, $timeout, iVXjsActions, iVXjsBus, iVXjsUIModule, iVXjs) {
        let { inputs, id, headerHTML, footerHTML, name, next = [], onSubmit = [], onInputReady = [], audio } = $scope.stateData;
        let audioEventNames = new AudioEventNames();

        this.inputs = inputs;
        this.id = id;
        this.stateID = id;
        this.onSubmit = (formInput, $event) => {
            const { currentTarget: element } = $event;

            if (formInput && formInput.$valid) {
                iVXjs.log.debug(`onSubmit Actions`, {}, { state: $scope.stateData, source: 'onSubmit', status: 'completed', actions: onSubmit, timestamp: Date.now() });
                iVXjsActions.resolveThenNavigate(onSubmit, next, {
                    type: "onsubmit",
                    element,
                    event: $event,
                    origin: "onSubmit"
                });
            }
        };

        $timeout(() => {

        }, 1);
    }
}

InputStateController.$inject = ['$state', '$scope', '$rootScope', '$timeout', 'ivxjs.actions', 'ivxjs.bus', 'ivxjs.modules.ui', 'iVXjs'];

export default createFactoryFunction(InputStateController);