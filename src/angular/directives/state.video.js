import createFactoryFunction from '../utilities/create-factory-function.js';
import VideoStateController from '../controllers/state.video.js';
import VideoEventConstants from "../../constants/video.events.js";


class VideoState {
    constructor($compile, $state, $sce, $timeout, iVXjs, iVXjsBus, iVXjsUIModule, createInlineVideo, pullInTemplate) {
        this.template = this.templateHTML;
        this.restrict = 'E';
        this.replace = true;
        this.scope = {}
        this.controller = VideoStateController
        this.controllerAs = 'vm';
        this.link = ($scope, iElm, iAttrs, controller) => {
            let {data} = angular.copy($state.current);

            controller.stateData = data;

            let {id, playerType = "html5", playerSettings = {}, cuePoints = [], personalizations = [], header = {}, footer = {}} = data;
            let {vimeoId, youtubeId, inlineSrc, iphoneInline = false} = playerSettings;
            let controlsHTML = ``;

            if (typeof playerSettings.controls === 'string') {
                controlsHTML = `<ivxjs-${playerSettings.controls}-video-controls></ivxjs-${playerSettings.controls}-video-controls>`;
            }

            if (vimeoId) playerType = 'vimeo';
            if (youtubeId) playerType = 'youtube';
            if (createInlineVideo.isiOS() && iphoneInline && inlineSrc) {
                playerType = 'html5';
                playerSettings.src = inlineSrc;
                data.isIphone = true;
            }

            

            let personalizationsHTML = personalizations.reduce((personalizationHTML, thisPersonalization, index) => {
                thisPersonalization = pullInTemplate.convertTemplateUrlToHtml(thisPersonalization, $scope);
                
                let { defaultAnimationClass = 'hide', html, id } = thisPersonalization;

                return `${personalizationHTML} <div id="${id}" class="${defaultAnimationClass}">${html}</div> `
            }, "");


            let videoPlayerHTML = `
               <ivxjs-${playerType}-video-player settings="vm.stateData.playerSettings" state-data="vm.stateData"></ivxjs-${playerType}-video-player>
               ${controlsHTML}
               ${personalizationsHTML}`;

            data = pullInTemplate.convertHeaderFooter(header, footer, data, controller);

            let videoFramework = new iVXjsUIModule.states.video(videoPlayerHTML, data);

            $scope.experience = iVXjs.experience.data;

            iElm.html(videoFramework.html);
            $compile(iElm.contents())($scope);

            if(createInlineVideo.isiOS()){
                let videoEventNames = new VideoEventConstants();
                $timeout(()=>{
                    iVXjsBus.emit(videoEventNames.CAN_PLAY);
                },1);
            }
        }
    }

    get templateHTML() {
        return `<div class="video-state-container"></div>`;
    }
}

VideoState.$inject = ['$compile', '$state', '$sce', '$timeout', 'iVXjs', 'ivxjs.bus', 'ivxjs.modules.ui', 'createInlineVideo', 'pullInTemplate'];

export default createFactoryFunction(VideoState);