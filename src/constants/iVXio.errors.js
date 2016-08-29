import iVXioConstants from "./iVXio.js";
import ErrorConstants from "./errors.js";

export default class extends iVXioConstants{
    constructor(){
        super();

        this.ERROR = new ErrorConstants().ERROR;

        let errorTypes = {
            EXPERIENCE : "experience",
            PLATFORM_UNAVAILABLE : "platform-unavailable",
            EVENT_NOT_FIRED : "event-not-fired"
        }

        this.addNames(errorTypes);
    }

    convention(errorName){
        let {ERROR, DELIMETER} = this;
        return  `${super.convention()}${DELIMETER}${ERROR}${DELIMETER}${errorName}`;   
    }
}