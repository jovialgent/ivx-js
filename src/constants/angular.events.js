import AngularConstants from "./angular.js";

export default class extends AngularConstants{
    constructor(){
        super();

        let eventNames = {
            TEMPLATE_NOT_FOUND : "template-not-found",
            BOOTSTRAPPED : "bootstrapped"
        };

        this.addNames(eventNames);
    }

    convention(eventName) {
        let {DELIMETER} = this;

        return `${super.convention()}${DELIMETER}${eventName}`;
    }
}