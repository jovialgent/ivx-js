import { Style } from "./style";
import { ErrorMessages } from "./messages.js";
import { AttributeTags } from "../utilities/attributes.js";

let style = new Style();

export class Text {
    constructor(inputObj = {}, errorMessages = ErrorMessages) {
        let {input = {}, settings = {}, tags = {}, errors = {}} = inputObj;

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

    get html() {
        let {input, settings, tags, errors, uiClasses, uiAttributes} = this;
        let {label = '', labelHTML, name = '', id = ''} = input;
        let {input: inputSettings = {}, showLabel = true} = settings;
        let {classes = ''} = inputSettings;

        classes = `${classes} ${uiClasses}`;

        let {messages: errorMessages = [], attributes: errorAttributes = '', nonValidate = [], tags: errorTags = ''} = errors;
        let errorHTML = new this.errorMessages(errorMessages).html;
        let nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

        nonValidateAttributesHTML = `${nonValidateAttributesHTML} ${uiAttributes}`;

        if (labelHTML) label = labelHTML;

        let inputHTML = ` 
            <label for="${id}"> ${label} </label>
            <input class="${classes}"  id="${id}" name="${name}"  type="text" ${nonValidateAttributesHTML}   ${errorTags} ${tags}>
            ${errorHTML}
       `;

        return `${inputHTML}`;
    }
}