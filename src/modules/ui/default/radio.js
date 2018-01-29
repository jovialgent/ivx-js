import { ErrorMessages } from "./messages.js";
import { AttributeTags } from "../utilities/attributes.js";

export class Radio {
    constructor(radioInputObj, errorMessages = ErrorMessages) {
        let { input = {}, radios = [], errors = {}, settings = {} } = radioInputObj;

        this.radios = radios;
        this.errors = errors;
        this.settings = settings;
        this.input = input;
        this.errorMessages = errorMessages;
        this.attributeTags = AttributeTags;
    }

    uiRadioGroup(radiosHTML) {
        return radiosHTML;
    };

    uiRadioButtonContainer(radioHTML, uiClasses, value = "") {
        let { id } = this.input;
        let currentId = `${id}${value.length > 0 ? '-' + value : ''}`;

        return ` 
        <label for="${currentId}" class="${uiClasses} ivx-input-label">
        ${radioHTML}
        </label>`;
    }

    renderRadioHTML(attrHTML, label, value) {
        let { id } = this.input;
        let currentId = `${id}${value.length > 0 ? '-' + value : ''}`;

        return ` 
            <input class="ivx-input" type="radio" id="${currentId}" ${attrHTML}>
            ${label}`;
    }

    get uiClasses() {
        return '';
    }

    get uiAttributes() {
        return ''
    }

    get beforeClasses() {
        return 'ivx-input-before';
    }

    get afterClasses() {
        return 'ivx-input-after';
    }

    get html() {
        let { errors, radios, settings, input, uiClasses, beforeClasses: defaultBeforeClasses, afterClasses: defaultAfterClasses } = this;
        let { messages: errorMessages, tags: errorTags = "" } = errors;
        let self = this;
        let { label: inputLabel, labelHTML: inputLableHTML, beforeHtml: beforeSettings = {}, afterHtml: afterSettings = {} } = input;
        let { showLabel = true } = settings;

        const { html: beforeHtml = "", classes: beforeClasses = "" } = beforeSettings;
        const { html: afterHtml ="", classes: afterClasses = "" } = afterSettings;


        if (inputLableHTML) inputLabel = inputLableHTML;

        let radiosHTML = radios.reduce((html, radio, index) => {
            let { label, attrHTML = '', classes = '', value } = radio;

            attrHTML = `${attrHTML} ${errorTags}`;

            let radioHTML = self.renderRadioHTML(attrHTML, label, input.radioButtons[index].value);

            return `${html}
            ${self.uiRadioButtonContainer(radioHTML, `${uiClasses} ${classes}`, input.radioButtons[index].value)}`;
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