import iVXjsConstants from "./index.js";

export default class extends iVXjsConstants{
    constructor(){
        super();
        this.LOGGING = "log";

        let logTypes = {
            ERROR : "error",
            WARN : "warn",
            TRACE : "trace",
            LOG :"",
            DEBUG : "debug"
        }

        this.addNames(logTypes);
    }

    convention(level){
        let {DELIMETER, LOGGING} = this;
        if(level.length <= 0){
           return  `${super.convention()}${DELIMETER}${LOGGING}`
        }

        return `${super.convention()}${DELIMETER}${LOGGING}${DELIMETER}${level}`;
    }
}