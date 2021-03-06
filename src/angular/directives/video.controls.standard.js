import createFactoryFunction from '../utilities/create-factory-function.js';
import StandardControlsController from '../controllers/video.controls.standard.js';
import VideoEventNames from '../../constants/video.events.js';

let videoEventNames = new VideoEventNames();


class StandardControls {
    constructor(iVXjsUI, iVXjsBus, iVXjs) {
        this.template = this.templateHTML;
        this.restrict = 'E';
        this.scope = {
            playerId: "@playerId",
            controlSettings: "=controlSettings"
        }
        this.controller = StandardControlsController
        this.controllerAs = 'vm'
        this.link = ($scope, iElm, iAttrs, controller) => {
            const { playerId, controlSettings } = $scope;
            const { classes = '' } = controlSettings;

            let videoControlContainer = iElm.find('div')[0];

            videoControlContainer.className = `${videoControlContainer.className} ${classes}`;

            let standardControls = new iVXjsUI.videoControls(videoControlContainer, playerId);

            controller.controls = standardControls;
            controller.playerId = playerId;

            standardControls.addEventListeners(iVXjsBus);

            $scope.$on('$destroy', () => {
                standardControls.dispose(iVXjsBus);
            })
        }
    }

    get templateHTML() {
        return `<div class="video-control-container ivx-video-controls-container"></div>`;
    }
}

StandardControls.$inject = ['ivxjs.modules.ui', 'ivxjs.bus', 'iVXjs'];

export default angular
    .module('ivx-js.directives.video.standard-controls', [])
    .directive('ivxjsStandardVideoControls', createFactoryFunction(StandardControls))
    .name;
