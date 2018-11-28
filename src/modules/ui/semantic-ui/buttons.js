import { Buttons as BasicButtons  } from '../basic/buttons.js';
import { ErrorMessages } from "./messages.js";

export class Buttons extends BasicButtons {
    constructor(buttons, inputData) {
        super(buttons, inputData, ErrorMessages);
    }
    
    get buttonClasses() {
        return 'ui button ivx-input-buttons ivx-input';
    }

};