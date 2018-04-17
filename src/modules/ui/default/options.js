import { Style } from "./style";
import { ErrorMessages } from "./messages.js";
import { AttributeTags } from "../utilities/attributes.js";

let style = new Style();

export class Options {
    constructor(inputObj, errorMessages = ErrorMessages) {
        let {input, defaultDisplay = '', settings = {}, tags = '', errors = {}} = inputObj;

        this.tags = tags;
        this.input = input;
        this.defaultDisplay = defaultDisplay;
        this.errors = errors;
        this.settings = settings;
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
        let {tags, input, defaultDisplay, errors, settings, uiClasses, uiAttributes} = this;
        let {id, name, options, label = '', labelHTML} = input;
        let {input: inputSettings = {}, showLabel = true} = settings;
        let {classes = ''} = inputSettings;

        classes = `${classes} ${uiClasses}`;

        let {messages: errorMessages = [], attributes: errorAttributes = '', nonValidate = [], tags: errorTags = ''} = errors;
        let defaultOptionTag = `<option value="">Select an option...</option>`;
        let errorHTML = new this.errorMessages(errorMessages).html;
        let nonValidateAttributesHTML = new this.attributeTags(errorAttributes, nonValidate).html;

        nonValidateAttributesHTML = `${nonValidateAttributesHTML} ${uiAttributes}`;

        if (errorAttributes.required || (defaultDisplay && defaultDisplay.length >= 0)) {
            defaultOptionTag = defaultDisplay ?
                `<option value="">${defaultDisplay}</option>` :
                defaultOptionTag;
        }

        if (labelHTML) label = labelHTML;

        let optionsHTML = options.reduce((optionHTML, option) => {
            return `${optionHTML}
            <option value="${option.value}">${option.display}</option>`
        }, '')

        let inputHTML = ` 
             <label for="${id}">${label}</label>             
               <select class="${classes}"  id="${id}" name="${name}"${nonValidateAttributesHTML} ${errorTags} ${tags}>
                  ${defaultOptionTag}
                  ${optionsHTML}
               </select>
               ${errorHTML}`;

        return `${inputHTML}`;
    }
}