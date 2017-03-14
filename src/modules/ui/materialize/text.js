import { Text as DefaultText } from '../default/text.js';
import { ErrorMessages } from "./messages.js";

export class Text extends DefaultText{
    constructor(inputObj) {
        super(inputObj, ErrorMessages);  
    } 

   
    get uiClasses() {
        return 'validate'
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
            
            <input ${nonValidateAttributesHTML} class="${classes}"  id="${id}" name="${name}"  type="text"    ${errorTags} ${tags}>
           
            ${errorHTML}
             <label for="${id}"> ${label} </label>
       `;

        return `${inputHTML}`;
    }
}