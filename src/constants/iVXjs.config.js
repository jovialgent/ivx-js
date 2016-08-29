import iVXjsConstants from "./index.js";

export default class extends  iVXjsConstants{
    constructor(){
        super();

        this.CONFIG = "config";
    }

    convention(){
        let {DELIMETER, CONFIG} = this;

        return  `${super.convention()}${DELIMETER}${CONFIG}`;   
    }
}