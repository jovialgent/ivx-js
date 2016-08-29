import iVXjsConstants from "./index.js";
import VideoConstants from "./video.js";
import HttpConstants from "./http.js";
import iVXioConstants from "./iVXio.js";


export default class extends iVXjsConstants {
   constructor() {
        super();
        this.ERROR = "error";

        let eventNames = {
            VIDEO: new VideoConstants().VIDEO,
            HTTP : new HttpConstants().HTTP,
            VALIDATION : "validation",
            SET_UP : "set-up",
            IVX_IO : new iVXioConstants().IVX_IO
        };

        this.addNames(eventNames);
    }

    convention(eventName) {
        let {ERROR, DELIMETER} = this;
        return `${super.convention()}${DELIMETER}${ERROR}${DELIMETER}${eventName}`;
    }

}