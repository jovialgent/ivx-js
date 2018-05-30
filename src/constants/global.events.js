import GlobalConstants from "./global";

export default class extends GlobalConstants{
    constructor(){
        super();

        let events = {
           ELEMENT_EVENT: "element-event"
        }

        this.addNames(events);
    }

    convention(eventName){
        let {DELIMETER} = this;
        return  `${super.convention()}${DELIMETER}${eventName}`;   
    }
}