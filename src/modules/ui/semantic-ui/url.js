import { Url as BasicUrl  } from '../basic/url.js';
import { ErrorMessages } from "./messages.js";

export class Url extends BasicUrl{
    constructor(inputObj) {
        super(inputObj, ErrorMessages);  
    } 
};