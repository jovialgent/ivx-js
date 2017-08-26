import iVXjsConstants from "./index.js";

export default class extends iVXjsConstants {
    constructor() {
        super();

        this.TRACKS = "tracks";
    }

    convention() {
        let { DELIMETER, TRACKS } = this;

        return `${super.convention()}${DELIMETER}${TRACKS}`;
    }
}