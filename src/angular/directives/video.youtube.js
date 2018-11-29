import createFactoryFunction from '../utilities/create-factory-function.js';
import YoutubeVideoPlayerController from '../controllers/video.youtube.js';

class YoutubeVideoPlayer {
    constructor($rootScope, $compile, $window, iVXjsBus, iVXjsLog, iVXjsVideoModule, iVXjsVideoService, iVXjs, ivxExperienceScope, pullInTemplate) {
        this.template = this.templateHTML;
        this.restrict = 'E';
        this.scope = {
            playerId: "@playerId",
            settings: "=settings",
            stateData: "=stateData"
        }
        this.controller = YoutubeVideoPlayerController
        this.controllerAs = 'vm';
        this.link = ($scope, iElm, iAttrs, controller) => {
            if (!iVXjsVideoModule.youtube) return;

            let { settings = {}, stateData: passedStateData = {}, playerId } = $scope;
            const { youtubeId } = settings;
            let cuepointFunction;
            const stateData = Object.assign({}, passedStateData);
            const { personalizations = [] } = stateData;

            let personalizationsHTML = personalizations.reduce((personalizationHTML, thisPersonalization, index) => {
                thisPersonalization = pullInTemplate.convertTemplateUrlToHtml(thisPersonalization, $scope);

                let { defaultAnimationClass = 'hide', html, id } = thisPersonalization;

                return `${personalizationHTML} <div id="${id}" class="${defaultAnimationClass} ivx-video-personalization-container ">${html}</div> `
            }, "");

            $scope = ivxExperienceScope.setScopeExperience($scope);

            const playerSettings = Object.assign({},
                settings,
                {
                    playerId,
                    personalizationsHTML,
                    id: youtubeId
                });
            if (stateData.cuePoints) {
                playerSettings.cuePoints = stateData.cuePoints;
            }

            let YouTubePlayer = new iVXjsVideoModule.youtube(iElm.find('div')[0], playerSettings, stateData, iVXjsLog);

            controller.player = YouTubePlayer;
            controller.playerId = playerId;


            $compile(iElm.contents())($scope);

            if (typeof YT === 'undefined') {
                $window.onYouTubeIframeAPIReady = init;
            } else {
                YT.ready(init);
            }

            function init() {
                YouTubePlayer.createPlayer();
                YouTubePlayer.addEventListeners(iVXjsBus);
                cuepointFunction = iVXjsVideoService.createCuePointListener(playerId, playerSettings.cuePoints);

            }

            $scope.$on("$destroy", () => {
                YouTubePlayer.dispose(iVXjsBus);
                iVXjsVideoService.removeCuePointListener(cuepointFunction);
            });
        }
    }

    get templateHTML() {
        return `
           <div class="youtube-player-container">
               <div id="{{playerId}}"></div>
           </div>`;
    }
}

YoutubeVideoPlayer.$inject = ['$rootScope', '$compile', '$window', 'ivxjs.bus', 'ivxjs.log', 'ivxjs.modules.video', "iVXjsVideoService", "iVXjs", "ivxExperienceScope", "pullInTemplate"];


export default angular
    .module('ivx-js.directives.video.youtube', [])
    .directive('ivxjsYoutubeVideoPlayer', createFactoryFunction(YoutubeVideoPlayer))
    .name;