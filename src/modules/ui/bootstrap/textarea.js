import { Textarea as BasicTextarea  } from '../basic/textarea.js';
import { ErrorMessages } from "./messages.js";

export class Textarea extends BasicTextarea{
    constructor(inputObj) {
        super(inputObj, ErrorMessages);  
    } 

    get uiClasses() {
        return 'form-control'
    }
}