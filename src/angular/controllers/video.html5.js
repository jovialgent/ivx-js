import createFactoryFunction from '../utilities/create-factory-function.js';
import VideoEventNames from '../../constants/video.events.js';

class HTML5VideoPlayerController {
    constructor($scope, iVXjsBus) {
        let self = this;
        let videoEventNames = new VideoEventNames();
     
        iVXjsBus.once(videoEventNames.DISPOSE, function disposeHTML5Player() {
            self.player.dispose(iVXjsBus);
        })
    }
}

HTML5VideoPlayerController.$inject = ['$scope', 'ivxjs.bus'];

export default createFactoryFunction(HTML5VideoPlayerController)