import TrackConstants from "./tracks.js";

export default class extends TrackConstants {
    constructor() {
        super();

        let eventNames = {
          ON_TRACK_CHANGE : "on-track-change",
          CHANGE_CURRENT_TRACK : "change-current-track"
        };

        this.addNames(eventNames);
    }

    convention(eventName) {
        let {DELIMETER} = this;

        return `${super.convention()}${DELIMETER}${eventName}`;
    }
}