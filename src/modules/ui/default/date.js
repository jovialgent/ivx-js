import {Style} from "./style";
import {ErrorMessages} from "./messages.js";
import {AttributeTags} from "../utilities/attributes.js";

let style = new Style();

/**
 * Creates a date input that will record date specific data 
 * for iVXjs.
 */
export class Date {

    /**
     * Accepts an input object with various input settings and UI specific error 
     * messages
     * @param {object} inputObj - various input settings to render this date input box
     * @param {object} inputObj.input - input specific settings for this date input 
     * @param {object} inputObj.settings - global settings for this date input 
     * @param {string} inputObj.tags - input specific attribute tags 
     * @param {class} inputObj.errors - errors from a rendering for validation and 
     * error messaging appearance.
     * @param {object} errorMessages - UI specific Error messages 
     */
    constructor(inputObj = {}, errorMessages = ErrorMessages) {
        let {input = {}, settings = {}, tags = {}, errors = {}} = inputObj;

        /**
         * Input specific settings for this date input
         * @type {object}  
         */
        this.input = input;

        /**
         * Global input settings for this date input 
         * @type {object}
         */
        this.settings = settings;

        /**
         * Tags to be added to this date input
         * @type {String}
         */
        this.tags = tags;

        /**
         * Holds all validation error correcting.
         * @type {Class}
         */
        this.errors = errors;

        /**
         * Renders UI specific error messages by utilizing the 
         * error class passed down to keep it consistent with the 
         * current UI framework.
         * @type {Class}
         */
        this.errorMessages = errorMessages;

        /**
         * Converts attribute data into attribute HTML for 
         * attributes not covered by the errors class.
         * @type {Class}
         */
        this.attributeTags = AttributeTags;
    }

    /**
     * Default ui classes to add to all date inputs 
     * @type {String}
     */
    get uiClasses() {
        return ''
    }

    /**
     * Default ui attributes to add to this date input 
     * that aren't covered by the tags or errors above.
     * @type {String}
     */
    get uiAttributes() {
        return ''
    }

    get beforeClasses(){
        return 'ivx-input-before ivx-input-before-date';
    }

    get afterClasses(){
        return 'ivx-input-after ivx-input-after-date';
    }

    /**
     * The HTML to render a date input based on the settings from the 
     * constructor. 
     * 
     * @example 
     * //Data 
     * input.label = "<h1>Label</h1>";
     * settings.classes = "class-1";
     * errors.tags = "required='true'";
     * Date.uiClasses = 'ui-classes-1';
     * // Renders 
     * <label>
     *      <h1>Label</h1>
     * </label>
     * <input class="class-1 ui-classes-1" type="date" required="true">
     * @type {String}
     */
    get html() {
        let {input, settings, tags, errors, uiClasses, uiAttributes, beforeClasses : defaultBeforeClasses, afterClasses : defaultAfterClasses} = this;
        let {label, labelHTML, name = '', id = '', beforeHtml : beforeSettings = {}, afterHtml : afterSettings = {}} = input;
        let {input: inputSettings = {}, showLabel = true} = settings;        
        let {classes = ''} = inputSettings;
        
        const {html : beforeHtml ="", classes : beforeClasses = ""} = beforeSettings;
        const {html : afterHtml ="", classes : afterClasses = ""} = afterSettings;
        
        classes = `${classes} ${uiClasses}`;

        let {messages: errorMessages = [], attributes: errorAttributes = '', nonValidate = [], tags: errorTags = ''} = errors;
        let errorHTML = new this.errorMessages(errorMessages).html;
        let nonValidateAttributesHTML = new AttributeTags(errorAttributes, nonValidate).html;
        
        nonValidateAttributesHTML = `${nonValidateAttributesHTML} ${uiAttributes}`;
        
        if (labelHTML) label = labelHTML;
        
        let inputHTML = ` 
            <div class="${beforeClasses} ${defaultBeforeClasses}">${beforeHtml}</div>
            <label class="ivx-input-label ivx-input-label-date" for="${id}"> ${label} </label>
            <input class="${classes} ivx-input ivx-input-date"  id="${id}" name="${name}"  type="date" ${nonValidateAttributesHTML}   ${errorTags} ${tags}>
            ${errorHTML}
            <div class="${afterClasses} ${defaultAfterClasses}">${afterHtml}</div>
       `;

        return `${inputHTML}`;
    }
}