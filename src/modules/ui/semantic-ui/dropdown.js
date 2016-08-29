import { Style } from "./style";
import { ErrorMessages } from "./messages.js";
import { AttributeTags } from "../utilities/attributes.js";

let style = new Style();

export class Dropdown {
    constructor(id, name, label, defaultDisplay, settings = {}, tagHTML, errorMessages) {
        this.errorMessages = errorMessages;
        this.name = name;
        this.label = label;
        this.defaultDisplay = defaultDisplay;
        this.tagHTML = tagHTML;
        this.id = id;
        this.settings = settings;
    }
    
    get uiClasses(){
        return 'ui dropdown'
    }

    get html() {
        let {id, name, label, defaultDisplay, settings, uiClasses} = this;
        let {dropdown = ""} = settings;
        let {multiple = false} = dropdown;
        let {input: inputSettings = {}} = settings;
        let {classes = ''} = inputSettings;

        classes = `${classes} ${uiClasses}`;

        let {messages: errorMessages = [], attributes: errorAttributes = '', nonValidate = [], tags: errorTags = ''} = this.errorMessages;
        let defaultOptionTag = `<option value="">Select an option...</option>`;
        let errorHTML = new ErrorMessages(errorMessages).html;
        let nonValidateAttributesHTML = new AttributeTags(errorAttributes, nonValidate).html;

        if (errorAttributes.required || (defaultDisplay && defaultDisplay.length >= 0)) {
            defaultOptionTag = defaultDisplay ?
                `<option value="">${defaultDisplay}</option>` :
                defaultOptionTag;
        }

        if (multiple) {
            nonValidateAttributesHTML = `${nonValidateAttributesHTML} multiple=""`;
        }

        let inputHTML = ` 
             <label>${label}</label>           
               <select class="${classes}"  id="${id}" name="${name}"${nonValidateAttributesHTML} ${errorTags} ${this.tagHTML}>
                    ${defaultOptionTag}
               </select>
               ${errorHTML}`;

        return `${inputHTML}`;
    }
};