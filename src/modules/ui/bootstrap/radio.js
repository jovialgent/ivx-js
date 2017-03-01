import { Radio as DefaultRadio } from '../default/radio.js';
import { ErrorMessages } from "./messages.js";

export class Radio extends DefaultRadio {
    constructor(inputObj) {
        super(inputObj, ErrorMessages);
    }

    get uiClasses() {
        return 'radio form-control'
    }

    get uiAttributes() {
        return ''
    }

    renderRadioHTML(attrHTML, label){ 
        let {input ={}} =this;
        let {id} = input;       
        return ` 
        <label for="${id}">
            <input type="radio" ${attrHTML}>
            ${label}
        </label>
        `       
    }
}