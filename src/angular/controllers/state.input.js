import createFactoryFunction from '../utilities/create-factory-function.js';
import StateData from '../utilities/state-data.js';
import AudioEventNames from "../../constants/audio.events.js";


class InputStateController {
    constructor($state, $scope, $rootScope, $timeout, iVXjsActions, iVXjsBus, iVXjsUIModule, iVXjs) {
        let thisStateDataClass = new StateData($state);
        let { inputs, id, headerHTML, footerHTML, name, next = [], onSubmit = [], onInputReady = [], audio } = thisStateDataClass.stateData;
        let audioEventNames = new AudioEventNames();

        this.inputs = inputs;
        this.id = id;
        this.stateID = id;
        this.onSubmit = (formInput) => {
            if (formInput && formInput.$valid) {
                iVXjs.log.debug(`onSubmit Actions`, {}, { state: $state.current.data, source: 'onSubmit', status: 'completed', actions: onSubmit, timestamp: Date.now() });
                iVXjsActions.resolveThenNavigate(onSubmit, next);
            }
        };

        $timeout(() => {

        }, 1);
    }
}

InputStateController.$inject = ['$state', '$scope', '$rootScope', '$timeout', 'ivxjs.actions', 'ivxjs.bus', 'ivxjs.modules.ui', 'iVXjs'];

export default createFactoryFunction(InputStateController);