import createFactoryFunction from '../utilities/create-factory-function.js';
import HTML5VideoController from '../controllers/video.html5.js';
import VideoEventConstants from "../../constants/video.events.js";

class HTML5VideoPlayer {
    constructor($compile, $timeout, iVXjsVideoModule, iVXjsBus, iVXjsLog, createInlineVideo, iVXjsVideoService, iVXjs, pullInTemplate, ivxExperienceScope) {
        this.template = this.templateHTML;
        this.restrict = 'E';
        this.scope = {
            settings: "=settings",
            playerId: "@playerId",
            stateData: "=stateData"
        };
        this.controller = HTML5VideoController;
        this.controllerAs = 'vm';
        this.link = ($scope, iElm, iAttrs, controller) => {
            let { settings: playerSettings, stateData = {}, playerId } = $scope;
            let { playerSettings: statePlayerSettings, personalizations = [] } = stateData;
            let videoEventNames = new VideoEventConstants();
            let settings = {};

            if (statePlayerSettings) {
                settings = statePlayerSettings;
                settings.cuePoints = statePlayerSettings.cuePoints ? statePlayerSettings.cuePoints : stateData.cuePoints;
            } else {
                settings = playerSettings;
            }

            let personalizationsHTML = personalizations.reduce((personalizationHTML, thisPersonalization, index) => {
                thisPersonalization = pullInTemplate.convertTemplateUrlToHtml(thisPersonalization, $scope);

                let { defaultAnimationClass = 'hide', html, id } = thisPersonalization;

                return `${personalizationHTML} <div id="${id}" class="${defaultAnimationClass} ivx-video-personalization-container ">${html}</div> `
            }, "");

            $scope = ivxExperienceScope.setScopeExperience($scope);

            settings = Object.assign(settings, {
                isiOS: createInlineVideo.isiOS(),
                id: playerId,
                personalizationsHTML
            });

            controller.playerId = playerId;

            let thisVideoPlayer = new iVXjsVideoModule.html5(iElm.find('div')[0], settings, stateData, iVXjsLog);

            thisVideoPlayer.addEventListeners(iVXjsBus, settings);

            $timeout(() => {
                let { iphoneInline = false } = settings;

                if (createInlineVideo.isiOS() && iphoneInline) {
                    createInlineVideo.makeInlineVideo(iElm.find('video')[0], iElm.find('div')[0], $scope);
                    createInlineVideo.emitCanPlay(iElm.find('video')[0]);
                }
            }, 1);

            controller.player = thisVideoPlayer;

            $compile(iElm.contents())($scope);

            const cuepointFunction = iVXjsVideoService.createCuePointListener(thisVideoPlayer.player.id, settings.cuePoints);

            $scope.$on('$destroy', () => {
                thisVideoPlayer.dispose(iVXjsBus);
                iVXjsVideoService.removeCuePointListener(cuepointFunction);
            });
        };
    }

    get templateHTML() {
        return `<div class="video-player-container ivx-video-player ivx-video-player-html5"></div>`;
    }
}

HTML5VideoPlayer.$inject = ['$compile', '$timeout', 'ivxjs.modules.video', 'ivxjs.bus', 'ivxjs.log', 'createInlineVideo', 'iVXjsVideoService', 'iVXjs', 'pullInTemplate', 'ivxExperienceScope'];

export default angular
    .module('ivx-js.directives.video.html5', [])
    .directive('ivxjsHtml5VideoPlayer', createFactoryFunction(HTML5VideoPlayer))
    .name;