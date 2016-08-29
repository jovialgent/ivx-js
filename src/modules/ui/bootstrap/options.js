import { Options as DefaultOptions } from '../default/options.js';
import { ErrorMessages } from "./messages.js";

export class Options extends DefaultOptions{
    constructor(inputObj) {
        super(inputObj, ErrorMessages);  
    } 
    
    get uiClasses(){
        return 'form-control';
    }
}