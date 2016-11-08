import iVXjsConfigConstants from "./iVXjs.config.js";

export default class extends  iVXjsConfigConstants{
    constructor(){
        super();

        let eventNames = {
            VALIDATED : "validated",
            NOT_VALID : "not-valid",
            ANALYTICS_SET : "analytics-set",
            ANALYTICS_FINISHED : "analytics-finished"
        };

        this.addNames(eventNames);
    }

    convention(eventName) {
        let {DELIMETER} = this;

        return `${super.convention()}${DELIMETER}${eventName}`;
    }
}