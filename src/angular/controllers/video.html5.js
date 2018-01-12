import createFactoryFunction from '../utilities/create-factory-function.js';
import VideoEventNames from '../../constants/video.events.js';

class HTML5VideoPlayerController {
    constructor($scope, iVXjsBus) {
        let self = this;
        let videoEventNames = new VideoEventNames();

        const disposeListener = iVXjsBus.on(videoEventNames.DISPOSE, function disposeHTML5Player(player = {}) {
            if (player.id === self.playerId) {
                self.player.dispose(iVXjsBus);
                iVXjsBus.removeListener(videoEventNames.DISPOSE, disposeListener);
            }
        })
    }
}

HTML5VideoPlayerController.$inject = ['$scope', 'ivxjs.bus'];

export default createFactoryFunction(HTML5VideoPlayerController)