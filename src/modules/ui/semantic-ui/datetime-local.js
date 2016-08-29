import { DatetimeLocal as DefaultDatetimeLocal } from '../default/datetime-local.js';
import { ErrorMessages } from "./messages.js";

export class DatetimeLocal extends DefaultDatetimeLocal{
    constructor(inputObj) {
        super(inputObj, ErrorMessages);  
    } 
};