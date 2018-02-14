import createFactoryFunction from './utilities/create-factory-function.js';
import AudioEventNames from '../constants/audio.events.js';
import StateEventNames from '../constants/state.events.js';
import AngularEventNames from '../constants/angular.events.js';

class AppRun {
    constructor($rootScope, $state, $window, $transitions, $http, iVXjs, iVXjsBus, iVXjsActions, iVXjsConstants) {
        if (!iVXjs || !iVXjs.config) return;

        let { metadata = {}, templates } = iVXjs.config;
        let { title = 'iVX Story Player', description, image } = metadata;
        let audioEventNames = new AudioEventNames();
        let stateEventNames = new StateEventNames();
        let angularEventNames = new AngularEventNames();

        $rootScope.pageTitle = title;
        $rootScope.ogImage = image;
        $rootScope.ogDescription = description;

        iVXjs.Bus.on(stateEventNames.GO, (state = {}) => {
            let evalState = state || {};

            if (Array.isArray(state)) {
                evalState = state[0];
            }

            const { route, stateId = "" } = evalState;
            const goToStateId = route ? route : stateId;

            console.log(goToStateId);
        
            if (goToStateId.length > 0) {
                console.dir($state);
                $state.go(goToStateId);
            }
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

            if ($state.current.data.restricted) {

                let navigateBackState = iVXjs.experience.config.pageNotFoundState ? iVXjs.experience.config.pageNotFoundState : iVXjs.experience.config.defaultState;
                let restrictRedirect = iVXjs.experience.rules(navigateBackState);

                if (iVXjs.experience.isRestricted) {
                    iVXjs.experience.isRestricted().then((restricted) => {
                        if (restricted) {
                            $state.go(restrictRedirect);
                        }
                    });
                }
            }
        }]);

        iVXjsBus.on(audioEventNames.ENDED, (currentAudio) => {
            if (currentAudio.id === 'state-audio') {
                iVXjsActions.resolveActions(currentAudio.onEnd, () => {

                })
            }
        });

        iVXjsBus.on(stateEventNames.REQUEST_STATE, () => {
            let currentState = $state.current;

            if (!currentState.data) {
                let defaultStateRules = iVXjs.experience.config.defaultState;
                let defaultStateId = iVXjs.experience.rules(defaultStateRules);

                currentState.data = iVXjs.config.states.find((state) => {
                    return state.id === defaultStateId;
                });
            }

            iVXjsBus.emit(stateEventNames.GET_STATE, currentState);
        });

        iVXjsBus.on(audioEventNames.TIME_UPDATE, (currentAudio) => {
            if (currentAudio.id === 'state-audio') {
                currentAudio.runCuePoints(iVXjs.experience.processor);
            }
        });
    }
}

AppRun.$inject = ['$rootScope', '$state', '$window', '$transitions', '$http', 'iVXjs', 'ivxjs.bus', 'ivxjs.actions', 'ivxjs.constants'];

export default createFactoryFunction(AppRun);