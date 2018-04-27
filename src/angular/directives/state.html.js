import createFactoryFunction from '../utilities/create-factory-function.js';
import HtmlStateController from '../controllers/state.html.js';
import AudioEventNames from "../../constants/audio.events.js";

class HtmlState {
    constructor($state, $http, $compile, $sce, $timeout, iVXjs, iVXjsActions, iVXjsAudio, iVXjsBus, ivxExperienceScope) {
        this.template = this.templateHTML;
        this.restrict = 'E';
        this.replace = true;
        this.scope = {};
        this.controller = HtmlStateController;
        this.controllerAs = 'vm';
        this.link = function ($scope, iElm, iAttrs, controller) {
            let { id, html, templateUrl, onCompile = [], audio } = $state.current.data;
            let audioEventNames = new AudioEventNames();

            if (templateUrl) {
                let safeTemplateUrl = $sce.getTrustedResourceUrl(templateUrl);

                controller.safeTemplateUrl = safeTemplateUrl

                iElm.html(`<div class="html-state-container" ng-include="vm.safeTemplateUrl"></div>`);
            } else {
                iElm.html(html);
            }

<<<<<<< HEAD
            $scope.$on('$destroy', () => {
                if (controller.timeOutId) {
                    $timeout.cancel(controller.timeOutId);
                }
            });
=======
>>>>>>> 66edc35f03aabb01d344fb2918a33d29056022f9


            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

<<<<<<< HEAD
            controller.embedded = embedded;

            function showState() {
=======
            $timeout(() => {
>>>>>>> 66edc35f03aabb01d344fb2918a33d29056022f9
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

<<<<<<< HEAD
                iVXjs.log.debug(`onCompile Started`, {}, { state: $scope.stateData, source: 'onCompile', status: 'started', actions: onCompile, timestamp: Date.now() });
=======
                iVXjs.log.debug(`onCompile Started`, {}, { state: $state.current.data, source: 'onCompile', status: 'started', actions: onCompile, timestamp: Date.now() });
>>>>>>> 66edc35f03aabb01d344fb2918a33d29056022f9

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
        return `<div ng-class="{'ivx-embedded-state': vm.embedded}" class="ivx-state-container ivx-state-html-container html-state-container" id="{{vm.id}}"></div>`;
    };
}

HtmlState.$inject = ['$state', '$http', '$compile', '$sce', '$timeout', 'iVXjs', 'ivxjs.actions', 'ivxjs.modules.audio', 'ivxjs.bus', "ivxExperienceScope"];

export default angular
    .module('ivx-js.directives.state.html', [])
    .directive('ivxjsHtmlState', createFactoryFunction(HtmlState))
    .name;