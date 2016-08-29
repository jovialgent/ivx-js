import { ErrorMessages as DefaultErrorMessages } from "../default/messages.js";

export class ErrorMessages extends DefaultErrorMessages {
    constructor(errorMessages = []){       
       super(errorMessages); 
    }
    
    get messageClasses(){
        return 'ui error message';
    }
    
};