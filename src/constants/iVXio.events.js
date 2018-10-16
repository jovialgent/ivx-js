import iVXioConstants from "./iVXio.js";
import ErrorConstants from "./errors.js";

export default class extends iVXioConstants{
    constructor(){
        super();

        let eventNames = {
           RECORD_EVENT : "record-event",
           SET_COMPLETE : "set-complete",
           SET_CONVERTED : "set-converted",
           SET_MILESTONE : "set-milestone",
           SET_DATA : "set-data",
           SET_CHILD_ENTITY: "set-child-entity"
        }

        this.addNames(eventNames);
    }

    convention(errorName){
        let {ERROR, DELIMETER} = this;
        return  `${super.convention()}${DELIMETER}${errorName}`;   
    }
}