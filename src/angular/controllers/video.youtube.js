import createFactoryFunction from '../utilities/create-factory-function.js';
import VideoEventNames from '../../constants/video.events.js';

class YoutubeVideoPlayerController {
    constructor($rootScope, $scope, $window, iVXjsBus, iVXjs) {
       
    }
}

YoutubeVideoPlayerController.$inject = ['$rootScope', '$scope', '$window', 'ivxjs.bus', 'iVXjs'];

export default createFactoryFunction(YoutubeVideoPlayerController)