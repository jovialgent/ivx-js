import iVXjsConstants from "./index.js";

export default class extends  iVXjsConstants{
    constructor(){
        super();

        this.IVX_IO = "iVXio";
    }

    convention(){
        let {DELIMETER, IVX_IO} = this;

        return  `${super.convention()}${DELIMETER}${IVX_IO}`;   
    }
}