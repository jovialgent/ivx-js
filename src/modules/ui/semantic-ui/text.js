import { Text as DefaultText } from '../default/text.js';
import { ErrorMessages } from "./messages.js";

export class Text extends DefaultText{
    constructor(inputObj) {
        super(inputObj, ErrorMessages);  
    } 
};