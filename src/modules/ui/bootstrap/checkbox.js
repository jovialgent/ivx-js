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
        let {input = {}} = this;
        let {id} = input;
        let {label} = input;
        return `
         <div class="${classes}">
             <label for="${id}">    
                <input ${attributes} type="checkbox">
                ${label}
            </label>
         </div>`
    }
}