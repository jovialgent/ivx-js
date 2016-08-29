import iVXjsStateConstants from "./state.js";

export default class extends  iVXjsStateConstants{
    constructor(){
        super();

        let eventNames = {
            CHANGE : "change",
            SUCCESS : "success",
            ERROR : "error",
            GO : "go",
            NOT_FOUND : "not-found"
        };

        this.addNames(eventNames);
    }

    convention(eventName) {
        let {DELIMETER} = this;

        return `${super.convention()}${DELIMETER}${eventName}`;
    }
}