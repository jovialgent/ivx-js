import createFactoryFunction from '../utilities/create-factory-function.js';
import VideoEventNames from '../../constants/video.events.js';

class YoutubeVideoPlayerController {
    constructor($rootScope, $scope, $window, iVXjsBus, iVXjs) {
        let self = this;
        let videoEventNames = new VideoEventNames();

        iVXjsBus.once(videoEventNames.DISPOSE, function disposeYouTubePlayer() {
            self.player.dispose(iVXjsBus);
        });
    }
}

YoutubeVideoPlayerController.$inject = ['$rootScope', '$scope', '$window', 'ivxjs.bus', 'iVXjs'];

export default createFactoryFunction(YoutubeVideoPlayerController)