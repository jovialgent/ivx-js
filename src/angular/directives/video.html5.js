import createFactoryFunction from '../utilities/create-factory-function.js';
import HTML5VideoController from '../controllers/video.html5.js';
import VideoEventConstants from "../../constants/video.events.js";

class HTML5VideoPlayer {
    constructor($compile, $timeout, iVXjsVideoModule, iVXjsBus, iVXjsLog, createInlineVideo) {
        this.template = this.templateHTML;
        this.restrict = 'E';
        this.scope = {
            settings: "=settings",
            stateData: "=stateData"
        };
        this.controller = HTML5VideoController;
        this.controllerAs = 'vm';
        this.link = ($scope, iElm, iAttrs, controller) => {
            let {settings, stateData} = $scope;
            let {playerSettings = {}} = stateData;
            let {iphoneInline = false} = playerSettings;
            let videoEventNames = new VideoEventConstants();

            stateData = {
                id: stateData.id,
                name: stateData.name,
                url: stateData.url,
                isiOS: createInlineVideo.isiOS()
            }

            let thisVideoPlayer = new iVXjsVideoModule.html5(iElm.find('div'), settings, stateData, iVXjsLog);

            thisVideoPlayer.addEventListeners(iVXjsBus);
            $timeout(() => {
                if (createInlineVideo.isiOS() && iphoneInline) {
                    createInlineVideo.makeInlineVideo(iElm.find('video')[0], iElm.find('div')[0], $scope);
                    createInlineVideo.emitCanPlay(iElm.find('video')[0]);
                }
            }, 1);

            controller.player = thisVideoPlayer;

            $compile(iElm.contents())($scope);
        };
    }

    get templateHTML() {
        return `<div class="video-player-container"></div>`;
    }
}

HTML5VideoPlayer.$inject = ['$compile', '$timeout', 'ivxjs.modules.video', 'ivxjs.bus', 'ivxjs.log', 'createInlineVideo'];

export default createFactoryFunction(HTML5VideoPlayer);