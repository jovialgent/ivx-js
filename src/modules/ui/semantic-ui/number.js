import { Number as DefaultNumber } from '../default/number.js';
import { ErrorMessages } from "./messages.js";

export class Number extends DefaultNumber{
    constructor(inputObj) {
        super(inputObj, ErrorMessages);  
    } 
};
