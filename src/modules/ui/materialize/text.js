import { Text as BasicText  } from '../basic/text.js';
import { ErrorMessages } from "./messages.js";

export class Text extends BasicText{
    constructor(inputObj) {
        super(inputObj, ErrorMessages);  
    } 

   
    get uiClasses() {
        return 'validate'
    }
}