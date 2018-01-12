import createFactoryFunction from '../utilities/create-factory-function.js';
import VideoEventNames from '../../constants/video.events.js';

class VimeoVideoPlayerController {
    constructor($scope, iVXjsBus) {
        let self = this;
        let videoEventNames = new VideoEventNames();

        const disposeEvent = iVXjsBus.on(videoEventNames.DISPOSE, (player) => {
            if (self.playerId === player.id) {
                self.player.dispose(iVXjsBus);
                iVXjsBus.removeListener(videoEventNames.DISPOSE, disposeEvent);
            }
        });
    }
}

VimeoVideoPlayerController.$inject = ['$scope', 'ivxjs.bus'];

export default createFactoryFunction(VimeoVideoPlayerController)