import Firebase from "./firebase.js";

export default class extends  Firebase{
    constructor(){
        super();
        
        let eventNames = {
            CREATE_EXPERIENCE : "create-experience"
        };

        this.addNames(eventNames);
    }

    convention(eventName) {
        let {DELIMETER} = this;

        return `${super.convention()}${DELIMETER}${eventName}`;
    }
}