import { Checkbox as DefaultCheckbox } from '../default/checkbox.js';
import { ErrorMessages } from "./messages.js";

export class Checkbox extends DefaultCheckbox {
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
             <label for="${input.id}">    
                ${label}
            </label>
         </div>`
    }
}