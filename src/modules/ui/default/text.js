import { Style } from "./style";
import { ErrorMessages } from "./messages.js";
import { AttributeTags } from "../utilities/attributes.js";

let style = new Style();

export class Text {
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

    get beforeClasses(){
        return 'ivx-input-before';
    }

    get afterClasses(){
        return 'ivx-input-after';
    }

    get html() {
        let { input, settings, tags, errors, uiClasses, uiAttributes, beforeClasses : defaultBeforeClasses, afterClasses : defaultAfterClasses } = this;
        let { label = '', labelHTML, name = '', id = '', beforeHtml : beforeSettings = {}, afterHtml : afterSettings = {} } = input;
        let { input: inputSettings = {}, showLabel = true } = settings;
        let { classes = '' } = inputSettings;

        const {html : beforeHtml = "", classes : beforeClasses = ""} = beforeSettings;
        const {html : afterHtml = "", classes : afterClasses = ""} = afterSettings;

        classes = `${classes} ${uiClasses}`;

        let { messages: errorMessages = [], attributes: errorAttributes = '', nonValidate = [], tags: errorTags = '' } = errors;
        let errorHTML = new this.errorMessages(errorMessages).html;
        let nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

        nonValidateAttributesHTML = `${nonValidateAttributesHTML} ${uiAttributes}`;

        if (labelHTML) label = labelHTML;

        let inputHTML = ` 
            <div class="${beforeClasses} ${defaultBeforeClasses}">${beforeHtml}</div>

                <label class="ivx-input-label" for="${id}"> ${label} </label>
                <input class="${classes} ivx-input"  id="${id}" name="${name}"  type="text" ${nonValidateAttributesHTML}   ${errorTags} ${tags}>
                ${errorHTML}
            <div class="${afterClasses} ${defaultAfterClasses}">${afterHtml}</div>
       `;

        return `${inputHTML}`;
    }
}