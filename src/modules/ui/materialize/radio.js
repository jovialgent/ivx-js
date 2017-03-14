import { Radio as DefaultRadio } from '../default/radio.js';
import { ErrorMessages } from "./messages.js";

export class Radio extends DefaultRadio {
    constructor(inputObj) {
        super(inputObj, ErrorMessages);
    }

    get uiClasses() {
        return 'radio form-control'
    }

     uiRadioButtonContainer(radioHTML, uiClasses) {
        return ` 
       <p>
        ${radioHTML}
        </p>`;
    }

    get uiAttributes() {
        return ''
    }

    renderRadioHTML(attrHTML, label, value){     
        let {id} = this.input;   
        return ` 
            <input name="${id}${value.length > 0 ? '-'+value: ''}"" type="radio" id="${id}${value.length > 0 ? '-'+value: ''}" ${attrHTML}>
            <label for="${id}${value.length > 0 ? '-'+value: ''}">${label}</label>
        `;     
    }

    get html() {
        let {errors, radios, settings, input, uiClasses} = this;
        let {messages: errorMessages, tags: errorTags = ""} = errors;
        let self = this;
        let {label: inputLabel, labelHTML: inputLableHTML} = input;
        let { showLabel = true} = settings;
        let {name} = input;

        if (inputLableHTML) inputLabel = inputLableHTML;

        let radiosHTML = radios.reduce((html, radio, index) => {
            let {label, attrHTML = '', classes = '', value} = radio;

            attrHTML = `${attrHTML} ${errorTags}`;

            let radioHTML = self.renderRadioHTML(attrHTML, label, input.radioButtons[index].value);

            return `${html}
            ${self.uiRadioButtonContainer(radioHTML, `${uiClasses} ${classes}`)}`;
        }, inputLabel);
        let errorHTML = new this.errorMessages(errorMessages).html;
        let allRadioButtonsHTML = `
             ${radiosHTML}
             ${errorHTML}`;

        return this.uiRadioGroup(allRadioButtonsHTML);
    }
}