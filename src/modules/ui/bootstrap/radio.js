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

    renderRadioHTML(attrHTML, label, value){ 
        let {input ={}} =this;
        let {id} = input;       
        let currentId = `${id}${value.length > 0 ? '-' + value : ''}`;

        return ` 
        <label for="${currentId}">
            <input type="radio" id="${currentId}" ${attrHTML}>
            ${label}
        </label>
        `       
    }
}