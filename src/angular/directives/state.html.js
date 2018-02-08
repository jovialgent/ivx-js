import createFactoryFunction from '../utilities/create-factory-function.js';
import HtmlStateController from '../controllers/state.html.js';
import AudioEventNames from "../../constants/audio.events.js";

class HtmlState {
    constructor($state, $http, $compile, $sce, $timeout, iVXjs, iVXjsActions, iVXjsAudio, iVXjsBus, ivxExperienceScope) {
        this.template = this.templateHTML;
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            stateData : "=stateData"
        };
        this.controller = HtmlStateController;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            let data = angular.copy($scope.stateData);
            let { id, html, templateUrl, onCompile = [], audio } = data;
            let audioEventNames = new AudioEventNames();

            if (templateUrl) {
                let safeTemplateUrl = $sce.getTrustedResourceUrl(templateUrl);

                controller.safeTemplateUrl = safeTemplateUrl

                iElm.html(`<div class="html-state-container" ng-include="vm.safeTemplateUrl"></div>`);
            } else {
                iElm.html(html);
            }



            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            $timeout(() => {
                let hasTransition = onCompile.find((event, index) => {
                    return event.eventName === "animateElement" && event.args.element === ".html-state-container";
                });

                if (!hasTransition) {
                    onCompile.push({
                        eventName: "animateElement",
                        args: {
                            element: ".html-state-container",
                            animationClasses: "show"
                        }
                    })
                }

                iVXjs.log.debug(`onCompile Started`, {}, { state: $state.current.data, source: 'onCompile', status: 'started', actions: onCompile, timestamp: Date.now() });

                iVXjsActions.resolveActions(onCompile, () => {
                    iVXjs.log.debug(`onCompile Completed`, {}, { state: $state.current.data, source: 'onCompile', status: 'completed', actions: onCompile, timestamp: Date.now() });
                    if (audio && audio.src) {
                        iVXjsBus.emit(audioEventNames.PLAY);
                    }

                })
            }, 1);
            $compile(iElm.contents())($scope);
        }
    }

    get templateHTML() {
        return `<div class="html-state-container" id="{{vm.id}}"></div>`;
    };
}

HtmlState.$inject = ['$state', '$http', '$compile', '$sce', '$timeout', 'iVXjs', 'ivxjs.actions', 'ivxjs.modules.audio', 'ivxjs.bus', "ivxExperienceScope"];

export default angular
    .module('ivx-js.directives.state.html', [])
    .directive('ivxjsHtmlState', createFactoryFunction(HtmlState))
    .name;