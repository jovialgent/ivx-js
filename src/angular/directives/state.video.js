import createFactoryFunction from '../utilities/create-factory-function.js';
import VideoStateController from '../controllers/state.video.js';
import VideoEventConstants from "../../constants/video.events.js";

class VideoState {
    constructor($compile, $state, $sce, $timeout, iVXjs, iVXjsBus, iVXjsUIModule, createInlineVideo, pullInTemplate, ivxExperienceScope, iVXjsStateGenerator) {
        this.template = this.templateHTML;
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            stateData: "="
        }
        this.controller = VideoStateController
        this.controllerAs = 'vm';
        this.link = ($scope, iElm, iAttrs, controller) => {
            let data = angular.copy($scope.stateData);

            controller.stateData = data;

            let { id, playerType = "html5", playerSettings = {}, cuePoints = [], personalizations = [], header = {}, footer = {}, embedded = false, embeddedViews = [] } = data;
            let { vimeoId, youtubeId, inlineSrc, iphoneInline = false } = playerSettings;
            let controlsHTML = ``;
            const playerId = playerSettings.id ? playerSettings.id : `${id}-video-player`;

            if (typeof playerSettings.controls === 'string') {
                controlsHTML = `<ivxjs-${playerSettings.controls}-video-controls player-id='${playerId}'></ivxjs-${playerSettings.controls}-video-controls>`;
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

            controller.playerId = playerId;

            let videoPlayerHTML = `
               <ivxjs-${playerType}-video-player player-id='${playerId}' settings="vm.stateData.playerSettings" state-data="vm.stateData"></ivxjs-${playerType}-video-player>
               ${controlsHTML}
               ${personalizationsHTML}`;

            data = pullInTemplate.convertHeaderFooter(header, footer, data, controller);

            let videoFramework = new iVXjsUIModule.states.video(videoPlayerHTML, data);

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);
            
            iElm.html(videoFramework.html);

            if(!embedded && embeddedViews.length > 0){
                iVXjsStateGenerator.addViews(embeddedViews, iElm);
            }

            $compile(iElm.contents())($scope, (compiled) => {
                iElm.html(compiled);

                if (createInlineVideo.isMobile() || createInlineVideo.isiOS()) {
                    let videoEventNames = new VideoEventConstants();
                    $timeout(() => {
                        let player = {};

                        if (playerType === 'html5') {
                            player = iElm.find('video')[0];
                        }

                        iVXjsBus.emit(videoEventNames.CAN_PLAY, player);
                    }, 500);
                }
            });


        }
    }

    get templateHTML() {
        return `<div class="video-state-container"></div>`;
    }
}

VideoState.$inject = ['$compile', '$state', '$sce', '$timeout', 'iVXjs', 'ivxjs.bus', 'ivxjs.modules.ui', 'createInlineVideo', 'pullInTemplate', 'ivxExperienceScope', 'iVXjsStateGenerator'];

export default angular
    .module('ivx-js.directives.state.video', [])
    .directive('ivxjsVideoState', createFactoryFunction(VideoState))
    .name;