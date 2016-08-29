import createFactoryFunction from './utilities/create-factory-function.js';
import HttpInterceptors from './services/http-interceptors.js';
import VideoEventNames from "../constants/video.events.js";
import StateEvents from "../constants/state.events.js";

let stateEvents = new StateEvents();

class AppConfig {
    constructor($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider, $httpProvider, $provide, iVXjs) {
        if (!iVXjs.config) return;

        this.createStates($stateProvider, iVXjs.config.states);

        let defaultStateID = iVXjs.rules(iVXjs.config.defaultState);
        let {url} = iVXjs.config.states.find((state) => { return state.id === defaultStateID });

        $urlRouterProvider
            .otherwise(($injector, $location) => {
                let currentUrl = $location.url();

                if (!currentUrl || currentUrl.length <= 0) {
                    return url;
                }

                iVXjs.Bus.emit(stateEvents.NOT_FOUND, currentUrl);

                let pageNotFoundStateId = iVXjs.rules(iVXjs.config.pageNotFoundState);
                let pageNotFoundUrl;

                let pageNotFoundState = iVXjs.config.states.find((state) => { return state.id === pageNotFoundStateId });

                if(pageNotFoundState){
                    pageNotFoundUrl  = pageNotFoundState.url;
                }
                
                return pageNotFoundUrl ? pageNotFoundUrl : url;
            });
        this.create$httpInjectors($httpProvider, $provide);
    }

    create$httpInjectors($httpProvider, $provide) {
        $provide.factory("iVXjsHttpInterceptors", HttpInterceptors);

        $httpProvider.interceptors.push("iVXjsHttpInterceptors");
    }

    createStates($stateProvider, states = []) {
        states.forEach((state, index) => {
            let {type, id, url, onEnter = [], onExit = []} = state;
            let videoEventNames = new VideoEventNames();

            $stateProvider.state(id, {
                url: url,
                data: state,
                template: `<ivxjs-${type}-state></ivxjs-${type}-state>`,
                onEnter: ['$rootScope', '$state', 'iVXjs', 'ivxjs.actions', 'ivxjs.bus', 'ivxjs.modules.audio.experience', 'ivxjs.modules.audio',
                    ($rootScope, $state, iVXjs, iVXjsActions, iVXjsBus, iVXjsAudioExperience, iVXjsAudio) => {
                        if (!iVXjsAudioExperience.eventsAdded) {
                            iVXjsAudioExperience.addEventListeners(iVXjsBus);
                            iVXjsAudio.addEventListeners(iVXjsBus);
                            iVXjs.experience.Bus = iVXjsBus;
                            iVXjsAudioExperience.eventsAdded = true;
                            iVXjsAudio.eventsAdded = true;
                            iVXjs.experience.audio = iVXjsAudioExperience;
                            iVXjs.experience.actions = iVXjsActions;
                        }

                        $rootScope.stateID = id;

                        iVXjsActions.resolveActions(onEnter, () => {

                        });
                    }],
                onExit: ['$rootScope', 'ivxjs.actions', 'iVXjs', 'ivxjs.bus', ($rootScope, iVXjsActions, iVXjs, iVXjsBus) => {
                    iVXjsBus.emit(videoEventNames.DISPOSE);
                    iVXjsActions.resolveActions(onExit, () => {

                    });
                }]
            });
        });
    }
}

AppConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider', '$httpProvider', '$provide', 'iVXjs'];

export default createFactoryFunction(AppConfig);