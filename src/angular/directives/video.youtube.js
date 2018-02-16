import createFactoryFunction from '../utilities/create-factory-function.js';
import YoutubeVideoPlayerController from '../controllers/video.youtube.js';

class YoutubeVideoPlayer {
    constructor($rootScope, $compile, $window, iVXjsBus, iVXjsLog, iVXjsVideoModule, iVXjsVideoService, iVXjs) {
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

            let { settings = {}, stateData = {}, playerId } = $scope;
            const { youtubeId } = settings;
            let cuepointFunction;

            const playerSettings = Object.assign({},
                settings,
                {
                    playerId,
                    id: youtubeId
                });

            stateData = {
                id: stateData.id,
                url: stateData.url,
                name: stateData.name
            };

            if (stateData.cuePoints) {
                playerSettings.cuePoints = stateData.cuePoints;
            }

            let YouTubePlayer = new iVXjsVideoModule.youtube(iElm.find('div'), playerSettings, stateData, iVXjsLog);

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
                cuepointFunction = iVXjsVideoService.createCuePointListener(YouTubePlayer.player.id, playerSettings.cuePoints);

            }

            $scope.$on("$destroy", () => {
                YouTubePlayer.dispose(iVXjsBus);
                iVXjsVideoService.removeCuePointListener(cuepointFunction);

                console.dir(iVXjs.Bus);
            })
        }
    }

    get templateHTML() {
        return `
           <div class="youtube-player-container">
               <div id="{{playerId}}"></div>
           </div>`;
    }
}

YoutubeVideoPlayer.$inject = ['$rootScope', '$compile', '$window', 'ivxjs.bus', 'ivxjs.log', 'ivxjs.modules.video', "iVXjsVideoService", "iVXjs"];


export default angular
    .module('ivx-js.directives.video.youtube', [])
    .directive('ivxjsYoutubeVideoPlayer', createFactoryFunction(YoutubeVideoPlayer))
    .name;