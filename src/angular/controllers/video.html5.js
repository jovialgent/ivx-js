import createFactoryFunction from '../utilities/create-factory-function.js';
import VideoEventNames from '../../constants/video.events.js';

class HTML5VideoPlayerController {
    constructor($scope, iVXjsBus, iVXjsVideoService) {
        "ngInject";
    }
}

HTML5VideoPlayerController.$inject = ['$scope', 'ivxjs.bus', 'iVXjsVideoService'];

export default createFactoryFunction(HTML5VideoPlayerController)