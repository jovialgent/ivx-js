import createFactoryFunction from './utilities/create-factory-function.js';
import HttpInterceptors from './services/http-interceptors.js';
import VideoEventNames from "../constants/video.events.js";
import StateEvents from "../constants/state.events.js";

let stateEvents = new StateEvents();

class AppConfig {
    constructor($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider, $httpProvider, $sceDelegateProvider, $provide, iVXjs, stateGeneratorProvider) {
        if (!iVXjs.config) return;

        stateGeneratorProvider.create($stateProvider, iVXjs);

        let { experience } = iVXjs;
        let defaultStateID = iVXjs.rules(iVXjs.config.defaultState);
        let url = stateGeneratorProvider.buildDefaultUrl(iVXjs, defaultStateID);

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

}

AppConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider', '$httpProvider', '$sceDelegateProvider', '$provide', 'iVXjs', 'stateGeneratorProvider'];

export default createFactoryFunction(AppConfig);