import { Email as BasicEmail  } from '../basic/email.js';
import { ErrorMessages } from "./messages.js";

export class Email extends BasicEmail{
    constructor(inputObj) {
        super(inputObj, ErrorMessages);  
    } 
};