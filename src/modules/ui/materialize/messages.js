import { ErrorMessages as BasicErrorMessages  } from "../basic/messages.js";

export class ErrorMessages extends BasicErrorMessages {
    constructor(errorMessages = []){       
       super(errorMessages);        
    }
    
    get containerClasses() {
        return 'has-error';
    }
    
    get messageClasses(){
        return 'help-block';
    }
}