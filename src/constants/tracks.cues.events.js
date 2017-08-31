import TrackCuesConstants from "./tracks.cues.js";

export default class extends TrackCuesConstants {
    constructor() {
        super();

        let eventNames = {
           ON_ENTER: "on-enter",
           ON_EXIT: "on-exit",
           ON_CHAPTER_START : "on-chapter-start",
           ON_CHAPTER_END : "on-chpater-end",
           CHANGE_CHAPTER  : "change-chapter"
        };

        this.addNames(eventNames);
    }

    convention(eventName) {
        let {DELIMETER} = this;

        return `${super.convention()}${DELIMETER}${eventName}`;
    }
}