import iVXjsConstants from "../../constants/index.js";

export default class extends  iVXjsConstants{
    constructor(){
        super();

        this.ANALYTICS = "analytics";
    }

    convention(){
        let {DELIMETER, ANALYTICS} = this;

        return  `${super.convention()}${DELIMETER}${ANALYTICS}`;   
    }
}