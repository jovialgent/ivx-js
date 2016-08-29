import iVXjsConstants from "./index.js";

export default class extends iVXjsConstants{
    constructor(){
        super();

        this.HTTP = "http";
    }

    convention(){
        let {DELIMETER, HTTP} = this;

        return  `${super.convention()}${DELIMETER}${HTTP}`;   
    }
}