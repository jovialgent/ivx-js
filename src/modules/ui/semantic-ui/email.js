import { Email as DefaultEmail } from '../default/email.js';
import { ErrorMessages } from "./messages.js";

export class Email extends DefaultEmail{
    constructor(inputObj) {
        super(inputObj, ErrorMessages);  
    } 
};