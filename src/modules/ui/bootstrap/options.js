import { Options as BasicOptions  } from '../basic/options.js';
import { ErrorMessages } from "./messages.js";

export class Options extends BasicOptions{
    constructor(inputObj) {
        super(inputObj, ErrorMessages);  
    } 
    
    get uiClasses(){
        return 'form-control';
    }
}