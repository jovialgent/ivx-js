import HTTPConstants from "./http.js";

export default class extends HTTPConstants{
    constructor(){
        super();

        let errorTypes = {
            REQUEST_ERROR : `request${this.DELIMETER}error`,
            REQUEST_SUCCESS : `request${this.DELIMETER}success`,
            RESPONSE_ERROR : `response${this.DELIMETER}error`,
            RESPONSE_SUCCESS : `response${this.DELIMETER}success`
        }

        this.addNames(errorTypes);
    }

    convention(errorName){
        let {DELIMETER} = this;
        return  `${super.convention()}${DELIMETER}${errorName}`;   
    }
}