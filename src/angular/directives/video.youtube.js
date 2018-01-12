import createFactoryFunction from '../utilities/create-factory-function.js';
import YoutubeVideoPlayerController from '../controllers/video.youtube.js';

class YoutubeVideoPlayer {
    constructor($rootScope, $compile, $window, iVXjsBus, iVXjsLog, iVXjsVideoModule) {
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
            }
        }
    }

    get templateHTML() {
        return `
           <div class="youtube-player-container">
               <div id="{{playerId}}"></div>
           </div>`;
    }
}

YoutubeVideoPlayer.$inject = ['$rootScope', '$compile', '$window', 'ivxjs.bus', 'ivxjs.log', 'ivxjs.modules.video'];


export default angular
    .module('ivx-js.directives.video.youtube', [])
    .directive('ivxjsYoutubeVideoPlayer', createFactoryFunction(YoutubeVideoPlayer))
    .name;