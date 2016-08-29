import { Style } from "./style";
import { ErrorMessages } from "./messages.js";
import { AttributeTags } from "../utilities/attributes.js";

let style = new Style();

/**
 * Produces html to build a checkbox input for the  
 * various rendering libraries. 
 */
export class Checkbox {

    /**
     * Sets up the checkbox's settings from a standard input data 
     * object and sets the type of error messages this class 
     * will render if the checkbox isn't valid.
     * 
     * @param {Object} inputObj - contains all the configurations 
     * to render this input.
     * @param {class} errorMessages - a class that will render the 
     * specific type of error messages based on this UI's settings.
     */
    constructor(inputObj = {}, errorMessages = ErrorMessages) {
        let {input, tags = '', settings = {}, errors = {}} = inputObj;

        /**
         * This checkbox's input configuration 
         * @type {Object}
         */
        this.input = input;

        /**
         * Any custom tags passed down from the rendering library. 
         * @type {String}
         */
        this.tags = tags;

        /**
         * Settings for this whole input including the container
         * @type {Object}
         */
        this.settings = settings;

        /**
         * A class of errors created by the rendering library to 
         * hide and show various errors.
         * @type {class}
         */
        this.errors = errors;

        /**
         * This UI's rendering of this error messages.
         * @type {class}
         */
        this.errorMessages = errorMessages;
    }

    /**
     * Adds a default class to this checkbox input 
     * @type {String}
     */
    get uiClasses() {
        return ''
    }

    /**
     * Any UI specific attributes
     * @type {String}
     */
    get uiAttributes() {
        return ''
    }

    /**
     * Attributes that required for this checkbox input 
     * to be used and rendered properly.
     * @return {String} - A string of all attributes to load 
     * this input including its id, name and type.
     */
    get requiredAttributes() {
        let {input} = this;
        let {id, name} = input;

        return `id="${id}" name="${name}" type="checkbox"`;
    }

    /**
     * Renders the HTML for this checkbox from the given attributes 
     * and classes.
     * @example
     * uiClasses = "class-1";
     * input.classes = "class-2";
     * requiredAttributes = "id='id-1' name='checkbox-name' type='checkbox'"
     * // Renders To:
     * <label class="class-1 class-2">
     *     <input id='id-1' name='checkbox-name' type='checkbox'>
     * </label>
     * @return {String} - html of the fully created checkbox
     */
    renderCheckboxContainer(classes, attributes) {
        let {input, settings} = this;
        let {label = '', labelHTML, name = '', id = ''} = input;
        let {showLabel = true} = settings;

        if (labelHTML) label = labelHTML;

        return `
            <label class="${classes}">
               <input ${attributes}>
               ${label}
            </label>
        `;
    }

    /**
     * Sets up and renders all the HTML for this checkbox based on the settings.
     * 
     * @type {String}
     */
    get html() {
        let {tags, settings = {}, errors, input, uiClasses, uiAttributes, requiredAttributes} = this;
        let {input: inputSettings = {}} = settings;
        let {classes = ''} = inputSettings;
        let { id, name, label = '' } = input;
        let { messages = [], attributes = {}, tags: errorTags = ''} = this.errors;
        let errorAttributes = attributes;
        let errorHTML = new this.errorMessages(messages).html;
        let allClasses = `${classes} ${uiClasses}`;
        let allAttributes = `${requiredAttributes} ${uiAttributes} ${tags} ${errorTags}`
        let checkboxHTML = this.renderCheckboxContainer(allClasses, allAttributes);
        let inputHTML = ` 
            ${checkboxHTML}
            ${errorHTML}
       `;

        return `${inputHTML}`;
    }
}