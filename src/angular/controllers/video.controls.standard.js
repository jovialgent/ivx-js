import createFactoryFunction from '../utilities/create-factory-function.js';
import VideoEventNames from '../../constants/video.events.js';

class StandardControls {
    constructor(iVXjsBus) {
        let self = this;
        let videoEventNames = new VideoEventNames();

        const disposeEvent = iVXjsBus.once(videoEventNames.DISPOSE, function disposeStandardControls(player = {}) {
            if (player.id === self.playerId) {
                self.controls.dispose(iVXjsBus);
                iVXjsBus.removeListener(videoEventNames.DISPOSE, dispatchEvent);
            }
        })
    }
}

StandardControls.$inject = ['ivxjs.bus'];

export default createFactoryFunction(StandardControls)