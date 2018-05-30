import iVXjsConstants from "./index.js";

export default class extends iVXjsConstants {
    constructor() {
        super();

        this.GLOBAL = "global";
    }

    convention() {
        let { DELIMETER, GLOBAL } = this;

        return `${super.convention()}${DELIMETER}${GLOBAL}`;
    }
}