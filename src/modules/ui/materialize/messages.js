import { ErrorMessages as DefaultErrorMessages } from "../default/messages.js";

export class ErrorMessages extends DefaultErrorMessages {
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