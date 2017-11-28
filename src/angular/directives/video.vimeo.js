import createFactoryFunction from '../utilities/create-factory-function.js';
import VimeoVideoPlayerController from '../controllers/video.vimeo.js';

class VimeoVideoPlayer {
    constructor($rootScope, $compile, $window, $timeout, iVXjsBus, iVXjsLog, iVXjsVideoModule, createInlineVideo) {
        this.template = this.templateHTML;
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            settings: "=settings",
            stateData: "=stateData"
        }
        this.controller = VimeoVideoPlayerController
        this.controllerAs = 'vm';
        this.link = ($scope, iElm, iAttrs, controller) => {
            if (!iVXjsVideoModule.vimeo) return;

            let { settings, stateData } = $scope;

            stateData = {
                id: stateData.id,
                url: stateData.url,
                name: stateData.name
            };
            settings.id = settings.vimeoId;

            let VimeoPlayer = new iVXjsVideoModule.vimeo(iElm.find('div'), settings, stateData, iVXjsLog);

            VimeoPlayer.addEventListeners(iVXjsBus);

            controller.player = VimeoPlayer;

            $compile(iElm.contents())($scope);
        }
    }

    get templateHTML() {
        return `
            <div class="vimeo-player-container">
                <div></div>
            </div>`;
    }
}

VimeoVideoPlayer.$inject = ['$rootScope', '$compile', '$window', '$timeout', 'ivxjs.bus', 'ivxjs.log', 'ivxjs.modules.video', 'createInlineVideo'];

export default angular
    .module('ivx-js.directives.video.vimeo', [])
    .directive('ivxjsVimeoVideoPlayer', createFactoryFunction(VimeoVideoPlayer))
    .name;
