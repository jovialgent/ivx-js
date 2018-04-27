import { Buttons as DefaultButtons } from '../default/buttons.js';
import { ErrorMessages } from "./messages.js";

export class Buttons extends DefaultButtons {
    constructor(buttons, inputData) {
        super(buttons, inputData, ErrorMessages);
    }
    
    get buttonClasses() {
        return 'ui button';
    }

};