import { Style } from "./style";
import { ErrorMessages } from "./messages.js";
import { AttributeTags } from "../utilities/attributes.js";
import { TypeValidator } from '../../../utilities/type-parsers.js';
import { assert } from '../../../utilities/asserts.js';

let style = new Style();
let typeCheck = new TypeValidator();

/**
 * Renders a collection of buttons for one click recording of 
 * an input that has multiple options for data recording.
 */
export class Buttons {

    /**
     * Takes the settings for the buttons, a class that renders the 
     * error messages and a class that renders attributes. 
     * 
     * @param {Object} buttonsInfo - Information to create this button input 
     * @param {Array} buttonsInfo.buttons - each individual button data and settings.
     * @param {Object} buttonsInfo.settings - settings for all buttons 
     * @param {Class} buttonsInfo.errors - an error class that was created by the 
     * rendering library so the errors open and display alongside the library. 
     */
    constructor(buttons = [], input, errorMessages = ErrorMessages) {

        /**
         * Buttons to be rendered
         * @type {Array}
         */
        this.buttons = buttons;

        /**
         * Settings for all buttons in this group 
         * @type {Object}
         */
        this.input = input;

        /**
         * Error message class that will take the errors from 
         * the rendering library and adds them to this input 
         * @type {Class}
         */
        this.errorMessages = errorMessages;

        /**
         * Creates attribute tags html to be added to this button 
         * inputs.
         * @type {Class}
         */
        this.attributeTags = AttributeTags;
    }

    /**
     * Lets users add the same classes to all buttons just in 
     * case buttons share a specific class.
     * 
     * @type {String}
     */
    get buttonClasses() {
        return '';
    }

    /**
     * Creates the HTML for every buttons defined in the buttons array and 
     * attaches the error messages attached to this input. 
     * 
     * @example
     * buttonClasses = 'button-class';
     * buttons = [{
     *    label : "Button 1",
     *    attrHTML : "disabled",
     *    classes : "class-1"
     * },{
     *    label : "<h1>Button 2</h1>",
     *    classes " class-2"
     * }];
     * 
     * // Will render:
     * 
     * <button class="button-class class-1" disabled>Button 1</button>
     * <button class="button class class-2"><h1>Button 2</h1></button>
     * 
     * @type {String}
     */
    get html() {
        let {errors: errorClass = {}, buttons = [], input = {}, buttonClasses} = this;
        let { attributes = {}, errors = {}, messages = {} } = errorClass;
        let buttonErrorMessages = Object.keys(attributes).map((key, index) => {
            return {
                message: `${errors[key]}`,
                attrHTML: ''
            }
        });
        let errorMessages = new this.errorMessages(buttonErrorMessages).html;
        let {label = '', labelHTML = '', showLabel = false} = input;
        let buttonsHTML = buttons.reduce((html, button, index) => {
            let { label, attrHTML = '', classes = "" } = button;

            return `${html} 
                   <button ${attrHTML} class="${classes} ${buttonClasses}">
                       ${label}
                   </button>`;
        }, '');

        if ((labelHTML.length > 0 || label.length > 0) && showLabel) {
            labelHTML = labelHTML ? labelHTML : label;
            labelHTML = `<label>${labelHTML}</label>`
        }

        return `
             ${labelHTML}
             ${buttonsHTML}
             ${errorMessages}             
        `;
    }
}
