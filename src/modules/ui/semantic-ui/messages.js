import { ErrorMessages as BasicErrorMessages  } from "../basic/messages.js";

export class ErrorMessages extends BasicErrorMessages {
    constructor(errorMessages = []){       
       super(errorMessages); 
    }
    
    get messageClasses(){
        return 'ui error message';
    }
    
};