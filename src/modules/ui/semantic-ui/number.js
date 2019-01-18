import { Number as BasicNumber  } from '../basic/number.js';
import { ErrorMessages } from "./messages.js";

export class Number extends BasicNumber{
    constructor(inputObj) {
        super(inputObj, ErrorMessages);  
    } 
};
