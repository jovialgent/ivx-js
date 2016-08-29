import { Url as DefaultUrl } from '../default/url.js';
import { ErrorMessages } from "./messages.js";

export class Url extends DefaultUrl{
    constructor(inputObj) {
        super(inputObj, ErrorMessages);  
    } 
    
    get uiClasses() {
        return 'form-control'
    }
}