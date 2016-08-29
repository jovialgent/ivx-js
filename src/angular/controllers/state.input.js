import createFactoryFunction from '../utilities/create-factory-function.js';
import StateData from '../utilities/state-data.js';
import AudioEventNames from "../../constants/audio.events.js";


class InputStateController {
    constructor($state, $scope, $rootScope, $timeout, iVXjsActions, iVXjsBus) {
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
            iVXjsActions.resolveActions(onInputReady, () => {
                if(audio && audio.src){
                    iVXjsBus.emit(audioEventNames.PLAY);
                }  
            })
        }, 1);
    }
}

InputStateController.$inject = ['$state', '$scope', '$rootScope', '$timeout', 'ivxjs.actions', 'ivxjs.bus'];

export default createFactoryFunction(InputStateController);