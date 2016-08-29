import VideoConstants from "./video.js";

export default class extends VideoConstants {
    constructor() {
        super();

        let eventNames = {
            VIDEO: new VideoConstants().VIDEO
        };

        this.addNames(eventNames);
    }

    convention(eventName) {
        return `${super.convention()}${DELIMETER}${eventName}`;
    }
}