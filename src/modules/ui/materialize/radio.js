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
            <input class="ivx-input ivx-input-radio" name="${id}${value.length > 0 ? '-'+value: ''}"" type="radio" id="${id}${value.length > 0 ? '-'+value: ''}" ${attrHTML}>
            <label class="ivx-input-label ivx-input-label-radio" for="${id}${value.length > 0 ? '-'+value: ''}">${label}</label>
        `;     
    }

    get html() {
        let {errors, radios, settings, input, uiClasses, beforeClasses : defaultBeforeClasses, afterClasses : defaultAfterClasses} = this;
        let {messages: errorMessages, tags: errorTags = ""} = errors;
        let self = this;
        let {label: inputLabel, labelHTML: inputLableHTML, beforeHtml : beforeSettings = {}, afterHtml : afterSettings = {}} = input;
        let { showLabel = true} = settings;
        let {name} = input;

        const {html : beforeHtml = "", classes : beforeClasses = ""} = beforeSettings;
        const {html : afterHtml = "", classes : afterClasses = ""} = afterSettings;

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
            <div class="${beforeClasses} ${defaultBeforeClasses}">${beforeHtml}</div>
             ${radiosHTML}
             ${errorHTML}
             <div class="${afterClasses} ${defaultAfterClasses}">${afterHtml}</div>    
         `;

        return this.uiRadioGroup(allRadioButtonsHTML);
    }
}