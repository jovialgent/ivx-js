import iVXjsConstants from "./index.js";

export default class extends iVXjsConstants{
    constructor(){
        super();

        this.ANGULAR = "angular";
    }

    convention(){
         let {DELIMETER, ANGULAR} = this;

        return  `${super.convention()}${DELIMETER}${ANGULAR}`;   
    }
}