import createFactoryFunction from '../utilities/create-factory-function.js';
import VideoEventNames from '../../constants/video.events.js';

class VimeoVideoPlayerController {
    constructor($scope, iVXjsBus) {
        let self = this;
        let videoEventNames = new VideoEventNames();

        iVXjsBus.once(videoEventNames.DISPOSE, function disposeVimeoPlayer() {
            self.player.dispose(iVXjsBus);
        })
    }
}

VimeoVideoPlayerController.$inject = ['$scope', 'ivxjs.bus'];

export default createFactoryFunction(VimeoVideoPlayerController)