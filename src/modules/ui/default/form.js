import {Style} from './style';

/**
 * Creates a form wrapper around these inputs and a 
 * submit button to submit the form.
 */
export class Form {

    /**
     * Sets up the various data to render this form.
     * @param {array} inputHTML - All input data to be added to this form 
     * @param {string} name - name of this form 
     * @param {string} additionalAttrHTML - Attributes that need to be 
     * added to the form primarily used for validation and submit functions.
     * @param {object} settings - Global settings for this form.
     */
    constructor(inputHTML, name, additionalAttrHTML, settings, style = Style) {

        /**
         * All input html information for this 
         * form
         * @type {String}
         */
        this.inputHTML = inputHTML;

        /**
         * Name for this form 
         * @type {String}
         */
        this.name = name;

        /**
         * Additional tags to add to this form 
         * @type {String}
         */
        this.additionalAttrHTML = additionalAttrHTML;

        /**
         * Settings for this entire form 
         * @type {Object}
         */
        this.settings = settings;

        /**
         * Settings for this submit button 
         * @type {Object}
         */
        this.submit = settings.submit;
        this.style = new style();
    }

    /**
     * Any default UI classes to add to this form 
     * @type {String}
     */
    get formClasses() {
        return 'row'
    }

    /**
     * Renders the HTML to render the 
     * @example
     * Form.settings = {
     *     submit : {
     *         label : "My new submit label",
     *         input : {
     *            classes : "my-submit-input"
     *         },
     *         container : {
     *             classes : "my-submit-container"
     *         }
     *     }
     * };
     * 
     * //Will Render 
     * 
     * <div class="ivxjs-grid-1-1 my-submit-container">
     *     <button class="my-submit-input" type="submit">
     *          My new submit label 
     *     </button>
     * </div>
     * 
     * @type {string}
     */
    get submitButtonHTML() {
        let {submit = {}} = this;
        let {label: submitLabel = "Submit", labelHTML: submitLabelHTML, input: submitInput = {}, container: submitContainer = {}, attributes = ''} = submit;
        let {classes: submitInputClasses = ""} = submitInput;
        let {classes: submitContainerClasses = ""} = submitContainer;

        submitLabel = submitLabelHTML ? submitLabelHTML : submitLabel;

        let submitHTML = submitLabel.length >= 0 ?
            `
            <div class="ivxjs-grid-1-1 ${submitContainerClasses}">
            <button class="${submitInputClasses}" type='submit' ${attributes}>
                    ${submitLabel}
                </button>
                </div>
                ` : '';

        return submitHTML;
    }



    /**
     * Wraps each input's html into a container so they can be formatted correctly
     * utilizing the ivxjs.css's grid system.
     * @type{String} 
     */
    get html() {
        let {inputHTML, name, additionalAttrHTML, settings, formClasses} = this;
        let {submit = {}, classes: configFormClasses = '', id : formId, label = '', labelHTML} = settings;

        if(labelHTML) label = labelHTML;
       
        if (!settings.hideSubmit) {
            inputHTML.push({
                settings: submit,
                html: this.submitButtonHTML
            });
        }

        let contents = this.style.addWidthClasses(inputHTML);

        return `
            ${label}
            <form id="${formId}-form" class="${formClasses} ${configFormClasses}" novalidate name="${name}" ${additionalAttrHTML}>                
                ${contents}
            </form>
        `;
    }
}