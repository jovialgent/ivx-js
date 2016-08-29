import { Textarea as DefaultTextarea } from '../default/textarea.js';
import { ErrorMessages } from "./messages.js";

export class Textarea extends DefaultTextarea{
    constructor(inputObj) {
        super(inputObj, ErrorMessages);  
    } 
};