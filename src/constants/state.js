import iVXjsConstants from "./index.js";

export default class extends  iVXjsConstants{
    constructor(){
        super();

        this.STATE = "state";
    }

    convention(){
        let {DELIMETER, STATE} = this;

        return  `${super.convention()}${DELIMETER}${STATE}`;   
    }
}