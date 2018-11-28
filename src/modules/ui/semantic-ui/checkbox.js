import { Checkbox as BasicCheckbox  } from '../basic/checkbox.js';
import { ErrorMessages } from "./messages.js";

export class Checkbox extends BasicCheckbox {
    constructor(inputObj) {
        super(inputObj, ErrorMessages);
    }

    get uiClasses() {
        return 'ui checkbox'
    }

    get uiAttributes() {
        return ''
    }

    renderCheckboxContainer(classes, attributes) {
        let {input} = this;
        let {label = '', labelHTML} = input;
        if(labelHTML) label = labelHTML;
        return `
         <div class="${classes}">
            <input ${attributes} >
             <label class="ivx-input-label ivx-input-label-checkbox" for="${input.id}">    
                ${label}
            </label>
         </div>`
    }
}