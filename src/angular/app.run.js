import createFactoryFunction from './utilities/create-factory-function.js';
import AudioEventNames from '../constants/audio.events.js';
import StateEventNames from '../constants/state.events.js';
import AngularEventNames from '../constants/angular.events.js';



class AppRun {
    constructor($rootScope, $state, $window, $transitions, iVXjs, iVXjsBus, iVXjsActions, iVXjsConstants) {
        if (!iVXjs || !iVXjs.config) return;

        let {metadata = {}} = iVXjs.config;
        let {title = 'iVX.js Player'} = metadata;
        let audioEventNames = new AudioEventNames();
        let stateEventNames = new StateEventNames();
        let angularEventNames = new AngularEventNames();

        $rootScope.pageTitle = title;

        iVXjs.Bus.on(stateEventNames.GO, (state) => {
            let evalState = state;
            
            if (Array.isArray(state)) {
                evalState = state[0];
            }
            
            $state.go(evalState.stateId);
        });

        $rootScope.$on("$includeContentError", function (event, args) {
            iVXjs.Bus.emit(angularEventNames.TEMPLATE_NOT_FOUND, event);
        });

        $transitions.onSuccess({ to: '*' }, ['$state', 'ivxjs.modules.audio', ($state, iVXjsAudio) => {
            let { data } = $state.current;
            iVXjs.Bus.emit(stateEventNames.CHANGE, $state.current);
            
            if (data.audio) {
                data.audio.id = 'state-audio';

                iVXjsBus.emit(audioEventNames.SET_UP, data.audio);
            } else {
                iVXjsAudio.pause();
            }
        }]);

        iVXjsBus.on(audioEventNames.ENDED, (currentAudio) => {
            if (currentAudio.id === 'state-audio') {
                iVXjsActions.resolveActions(currentAudio.onEnd, () => {

                })
            }
        });

        iVXjsBus.on(audioEventNames.TIME_UPDATE, (currentAudio) => {
            if (currentAudio.id === 'state-audio') {
                currentAudio.runCuePoints(iVXjs.experience.processor);
            }
        });
    }
}

AppRun.$inject = ['$rootScope', '$state', '$window', '$transitions', 'iVXjs', 'ivxjs.bus', 'ivxjs.actions', 'ivxjs.constants'];

export default createFactoryFunction(AppRun);