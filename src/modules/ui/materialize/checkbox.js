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
            <div class="input-field">
            <input class="ivx-input ivx-input-checkbox" style="position:absolute; left:0; z-index:9999; margin:17px 26px; cursor:pointer;" type="checkbox" ${attributes}>
            <label class="ivx-input-label ivx-input-label-checkbox" for="${input.id}"> ${label}</label>   
            </div>
        `
    }
}