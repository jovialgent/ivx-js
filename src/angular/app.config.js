import createFactoryFunction from './utilities/create-factory-function.js';
import HttpInterceptors from './services/http-interceptors.js';
import VideoEventNames from "../constants/video.events.js";
import StateEvents from "../constants/state.events.js";

let stateEvents = new StateEvents();

class AppConfig {
    constructor($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider, $httpProvider, $sceDelegateProvider, $provide, iVXjs, stateCreatorProvider) {
        if (!iVXjs.config) return;


        stateCreatorProvider.create($stateProvider, iVXjs)

        let { experience } = iVXjs;
        let { templates = [] } = iVXjs.config;
        let defaultStateID = iVXjs.rules(iVXjs.config.defaultState);
        let { url } = iVXjs.config.states.find((state) => { return state.id === defaultStateID }) || {};

        if (experience.whiteList) {
            $sceDelegateProvider.resourceUrlWhitelist(experience.whiteList);
        }

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

                if (pageNotFoundState) {
                    pageNotFoundUrl = pageNotFoundState.url;
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
            let { type, id, url, onEnter = [], onExit = [] } = state;
            let videoEventNames = new VideoEventNames();

            $stateProvider.state(id, {
                url: url,
                data: state,
                template: `<ivxjs-${type}-state class="hide"></ivxjs-${type}-state>`,
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

                        iVXjs.log.debug('On Enter Actions Start', {}, { source: 'onEnter', status: 'started', actions: onEnter, timestamp : Date.now() });


                        $rootScope.stateID = id;

                        iVXjsActions.resolveActions(onEnter, () => {
                            iVXjs.log.debug('On Enter Actions Resolved', {}, { source: 'onEnter', actions: onEnter, status: 'completed', timestamp : Date.now() });
                        });
                    }],
                onExit: ['$rootScope', '$state', 'ivxjs.actions', 'iVXjs', 'ivxjs.bus', ($rootScope, $state, iVXjsActions, iVXjs, iVXjsBus) => {
                    if($state.current.data.player){
                        iVXjsBus.emit(videoEventNames.DISPOSE, $state.current.data.player);
                    }
                    iVXjs.log.debug('On Exit Actions Start', {}, { source: 'onExit', status: 'started', actions: onEnter });
                    iVXjsActions.resolveActions(onExit, () => {
                        iVXjs.log.debug('On Exit Events Actions Resolved', {}, { source: 'onExit', actions: onExit, status: 'completed', timestamp : Date.now() });
                    });
                }]
            });
        });
    }
}

AppConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider', '$httpProvider', '$sceDelegateProvider', '$provide', 'iVXjs', 'ivxjsStateCreatorProvider'];

export default createFactoryFunction(AppConfig);