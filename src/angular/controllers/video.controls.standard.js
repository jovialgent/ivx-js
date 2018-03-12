import createFactoryFunction from '../utilities/create-factory-function.js';
import VideoEventNames from '../../constants/video.events.js';

class StandardControls {
    constructor(iVXjsBus) {
        
    }
}

StandardControls.$inject = ['ivxjs.bus'];

export default createFactoryFunction(StandardControls)