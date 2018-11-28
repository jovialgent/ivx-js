import { Buttons as BasicButtons  } from '../basic/buttons.js';
import { ErrorMessages } from "./messages.js";

export class Buttons extends BasicButtons {
    constructor(buttons, input) {
        super(buttons, input, ErrorMessages);
    }
    
    get buttonClasses() {
        return 'btn ivx-input-buttons ivx-input';
    }

}