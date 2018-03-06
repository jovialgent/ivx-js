import createFactoryFunction from '../utilities/create-factory-function.js';
import VideoEventNames from '../../constants/video.events.js';

class VimeoVideoPlayerController {
    constructor($scope, iVXjsBus) {
        
    }
}

VimeoVideoPlayerController.$inject = ['$scope', 'ivxjs.bus'];

export default createFactoryFunction(VimeoVideoPlayerController)