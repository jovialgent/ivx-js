import { Checkbox as DefaultCheckbox } from '../default/checkbox.js';
import { ErrorMessages } from "./messages.js";

export class Checkbox extends DefaultCheckbox {
    constructor(inputObj) {
        super(inputObj, ErrorMessages);
    }

    get uiClasses() {
        return 'checkbox form-control'
    }

    get uiAttributes() {
        return ''
    }

    renderCheckboxContainer(classes, attributes) {
        let {input} = this;
        let {label} = input;
        return `
         <div class="${classes}">
             <label>    
                <input ${attributes} type="checkbox">
                ${label}
            </label>
         </div>`
    }
}