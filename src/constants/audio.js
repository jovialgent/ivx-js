import iVXjsConstants from "./index.js";

export default class extends iVXjsConstants{
    constructor(){
        super();

        this.AUDIO = "audio";
    }

    convention(){
         let {DELIMETER, AUDIO} = this;

        return  `${super.convention()}${DELIMETER}${AUDIO}`;   
    }
}