import iVXjsConstants from "./index.js";

export default class extends  iVXjsConstants{
    constructor(){
        super();

        this.VIDEO = "video";
    }

    convention(){
        let {DELIMETER, VIDEO} = this;

        return  `${super.convention()}${DELIMETER}${VIDEO}`;   
    }
}