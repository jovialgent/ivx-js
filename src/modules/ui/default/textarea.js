import { Style } from "./style";
import { ErrorMessages } from "./messages.js";
import { AttributeTags } from "../utilities/attributes.js";

let style = new Style();

export class Textarea {
    constructor(inputObj = {}, errorMessages = ErrorMessages) {
        let { input = {}, settings = {}, tags = {}, errors = {} } = inputObj;

        this.input = input;
        this.settings = settings;
        this.tags = tags;
        this.errors = errors;
        this.errorMessages = errorMessages;
        this.attributeTags = AttributeTags;
    }

    get uiClasses() {
        return ''
    }

    get uiAttributes() {
        return ''
    }

    get beforeClasses() {
        return 'ivx-input-before ivx-input-before-textarea';
    }

    get afterClasses() {
        return 'ivx-input-after ivx-input-after-textarea';
    }

    get html() {
        let { input, settings, tags, errors, uiClasses, uiAttributes, beforeClasses: defaultBeforeClasses, afterClasses: defaultAfterClasses } = this;
        let { label = '', labelHTML, name = '', id = '', beforeHtml: beforeSettings = {}, afterHtml: afterSettings = {} } = input;
        let { input: inputSettings = {}, showLabel = true } = settings;
        let { classes = '' } = inputSettings;
        let { messages: errorMessages = [], attributes: errorAttributes = '', nonValidate = [], tags: errorTags = '' } = errors;
        let errorHTML = new this.errorMessages(errorMessages).html;
        let nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

        const { html: beforeHtml = "", classes: beforeClasses = "" } = beforeSettings;
        const { html: afterHtml = "", classes: afterClasses = "" } = afterSettings;

        if (labelHTML) label = labelHTML;

        label = showLabel ? label : '';

        let inputHTML = ` 
        <div class="${beforeClasses} ${defaultBeforeClasses}">${beforeHtml}</div>
            <label class="ivx-input-label ivx-input-label-textarea" for="${id}"> ${label} </label>
            <textarea class="${classes} ${uiClasses} ivx-input ivx-input-textarea"  id="${id}" name="${name}" ${uiAttributes}   ${nonValidateAttributesHTML}   ${errorTags} ${tags}>
            </textarea>
            ${errorHTML}
            <div class="${afterClasses} ${defaultAfterClasses}">${afterHtml}</div>
       `;

        return `${inputHTML}`;
    }
}