import { Date as DefaultDate } from '../default/date.js';
import { ErrorMessages } from "./messages.js";

export class Date extends DefaultDate{
    constructor(inputObj) {
        super(inputObj, ErrorMessages);  
    } 
}