import TracksConstants from "./tracks.js";

export default class extends TracksConstants {
    constructor() {
        super();

        this.CUES = "cues";
    }

    convention() {
        let { DELIMETER, CUES } = this;

        return `${super.convention()}${DELIMETER}${CUES}`;
    }
}