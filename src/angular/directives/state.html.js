import createFactoryFunction from '../utilities/create-factory-function.js';
import HtmlStateController from '../controllers/state.html.js';
import AudioEventNames from "../../constants/audio.events.js";

class HtmlState {
    constructor($state, $http, $compile, $sce, $timeout, iVXjs, iVXjsActions, iVXjsAudio, iVXjsBus, ivxExperienceScope, iVXjsStateCreator) {
        this.template = this.templateHTML;
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            stateData: "="
        };
        this.controller = HtmlStateController;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            let data = angular.copy($scope.stateData);
            let { id, html, templateUrl, onCompile = [], audio, embedded = false, embeddedViews = [], section = {} } = data;
            const { classes: sectionClasses } = section;
            let audioEventNames = new AudioEventNames();

           
            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            if (templateUrl) {
                let safeTemplateUrl = $sce.getTrustedResourceUrl(templateUrl);

                controller.safeTemplateUrl = safeTemplateUrl;

                addViews(`<div class="html-state-container" ng-include="vm.safeTemplateUrl"></div>`, true);
            } else {
                addViews(html, true);
            }

            $scope.$on('$destroy', () => {
                if (controller.timeOutId) {
                    $timeout.cancel(controller.timeOutId);
                }
            });

            function addViews(html, shouldShowState) {
                iElm.addClass(sectionClasses);
                iElm.html(html);

                if (!embedded && embeddedViews.length > 0) {
                    iVXjsStateCreator.addViews(embeddedViews, iElm);
                }

                $compile(iElm.contents())($scope, (compiled) => {
                    iElm.html(compiled);
                    if (shouldShowState) showState();
                });
            }

            controller.embedded = embedded;

            function showState() {
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

                iVXjs.log.debug(`onCompile Started`, {}, { state: $scope.stateData, source: 'onCompile', status: 'started', actions: onCompile, timestamp: Date.now() });

                iVXjsActions.resolveActions(onCompile, () => {
                    iVXjs.log.debug(`onCompile Completed`, {}, { state: $scope.stateData, source: 'onCompile', status: 'completed', actions: onCompile, timestamp: Date.now() });
                    if (audio && audio.src) {
                        iVXjsBus.emit(audioEventNames.PLAY);
                    }

                })
            }
        }
    }

    get templateHTML() {
        return `<div ng-class="{'ivx-embedded-state': vm.embedded}" class="ivx-state-container ivx-state-html-container html-state-container" id="{{vm.id}}"></div>`;
    };
}

HtmlState.$inject = ['$state', '$http', '$compile', '$sce', '$timeout', 'iVXjs', 'ivxjs.actions', 'ivxjs.modules.audio', 'ivxjs.bus', "ivxExperienceScope", "iVXjsStateCreator"];

export default angular
    .module('ivx-js.directives.state.html', [])
    .directive('ivxjsHtmlState', createFactoryFunction(HtmlState))
    .name;