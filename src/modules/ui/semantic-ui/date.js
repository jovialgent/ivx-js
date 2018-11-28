import { Date as BasicDate  } from '../basic/date.js';
import { ErrorMessages } from "./messages.js";

export class Date extends BasicDate{
    constructor(inputObj) {
        super(inputObj, ErrorMessages);  
    } 
}