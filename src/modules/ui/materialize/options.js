import { Options as DefaultOptions } from '../default/options.js';
import { ErrorMessages } from "./messages.js";

export class Options extends DefaultOptions{
    constructor(inputObj) {
        super(inputObj, ErrorMessages);  
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
                         
               <select class="${classes}"  id="${id}" name="${name}"${nonValidateAttributesHTML} ${errorTags} ${tags}>
                  ${defaultOptionTag}
                  ${optionsHTML}
               </select>
               <label>${label}</label> 
               ${errorHTML}`;

        return `${inputHTML}`;
    }
}