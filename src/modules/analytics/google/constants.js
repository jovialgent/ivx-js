import AnalyticsConstants from "../constants.js";

export default class extends AnalyticsConstants {
    constructor() {
        super();
        this.GOOGLE = "google";
        let eventNames = {
           SEND : "send"
        };

        this.addNames(eventNames);
    }

     convention(eventName) {
        let {DELIMETER,GOOGLE} = this;

        return `${super.convention()}${DELIMETER}${GOOGLE}${DELIMETER}${eventName}`;
    }
}