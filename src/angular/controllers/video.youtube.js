import createFactoryFunction from '../utilities/create-factory-function.js';
import VideoEventNames from '../../constants/video.events.js';

class YoutubeVideoPlayerController {
    constructor($rootScope, $scope, $window, iVXjsBus, iVXjs) {
        let self = this;
        let videoEventNames = new VideoEventNames();

        const disposeEvent = iVXjsBus.on(videoEventNames.DISPOSE, (player) => {
            if (self.playerId === player.id) {
                self.player.dispose(iVXjsBus);
                iVXjsBus.removeListener(videoEventNames.DISPOSE, disposeEvent);
                player.destroy()
            }
        });
    }
}

YoutubeVideoPlayerController.$inject = ['$rootScope', '$scope', '$window', 'ivxjs.bus', 'iVXjs'];

export default createFactoryFunction(YoutubeVideoPlayerController)