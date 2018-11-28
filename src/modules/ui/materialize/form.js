import { Style } from './style.js';
import { Form as BasicForm } from '../basic/form.js';

export class Form extends BasicForm {
    constructor(inputHTML, name, additionalAttrHTML, settings) {
        super(inputHTML, name, additionalAttrHTML, settings, Style);
    }

    get formClasses() {
        return 'col s12'
    }

    get submitButtonHTML() {
        let {submit = {},  beforeClasses : defaultBeforeClasses, afterClasses : defaultAfterClasses} = this;
        let {label: submitLabel = "Submit", labelHTML: submitLabelHTML, input: submitInput = {}, container: submitContainer = {}, attributes = '',beforeHtml : beforeSettings = {}, afterHtml : afterSettings = {}} = submit;
        let {classes: submitInputClasses = ""} = submitInput;
        let {classes: submitContainerClasses = ""} = submitContainer;
        
        const {html : beforeHtml = "", classes : beforeClasses = ""} = beforeSettings;
        const {html : afterHtml = "", classes : afterClasses = ""} = afterSettings;

        submitLabel = submitLabelHTML ? submitLabelHTML : submitLabel;

        let submitHTML = submitLabel.length >= 0 ?
            `
            
                <div class="col s12 ${submitContainerClasses} ivx-input-container ivx-input-container-submit-button">
                    <div class="${beforeClasses} ${defaultBeforeClasses}">${beforeHtml}</div>
                    <button class="btn ${submitInputClasses} ivx-input ivx-input-submit-button" type='submit'>
                        ${submitLabel}
                    </button>
                    <div class="${afterClasses} ${defaultAfterClasses}">${afterHtml}</div>
                </div>
         
            ` : '';

        return submitHTML;
    }
}