import Firebase from "./firebase.js";

export default class extends  Firebase{
    constructor(){
        super();

        this.AUTHENTICATION = "auth"

        let eventNames = {
            REQUEST_PASSWORD : "request-password",
            GET_PASSWORD : "get-password",
            ACCOUNT_EXISTS : "account-exists-with-different-credential"
        };

        this.addNames(eventNames);
    }

    convention(eventName) {
        let {DELIMETER, AUTHENTICATION} = this;

        return `${super.convention()}${DELIMETER}${AUTHENTICATION}${DELIMETER}${eventName}`;
    }
}