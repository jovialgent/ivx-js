import { Buttons as DefaultButtons } from '../default/buttons.js';
import { ErrorMessages } from "./messages.js";

export class Buttons extends DefaultButtons {
    constructor(buttons, input) {
        super(buttons, input, ErrorMessages);
    }
    
    get buttonClasses() {
        return 'btn';
    }

}