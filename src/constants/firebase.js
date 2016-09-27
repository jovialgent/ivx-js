import iVXjsConstants from "./index.js";

export default class extends  iVXjsConstants{
    constructor(){
        super();

        this.FIREBASE = "firebase";
    }

    convention(){
        let {DELIMETER, FIREBASE} = this;

        return  `${super.convention()}${DELIMETER}${FIREBASE}`;   
    }
}