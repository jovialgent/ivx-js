import createFactoryFunction from '../utilities/create-factory-function.js';
import VideoEventNames from '../../constants/video.events.js';

class StandardControls  {
	constructor(iVXjsBus) {
        let self = this;
        let videoEventNames = new VideoEventNames();
		
		iVXjsBus.once(videoEventNames.DISPOSE, function disposeStandardControls() {
            self.controls.dispose(iVXjsBus);
        })
	}
}

StandardControls.$inject = ['ivxjs.bus'];

export default createFactoryFunction(StandardControls)