import { Style } from './style.js';
import { Form as DefaultForm } from '../default/form.js';

export class Form extends DefaultForm {
    constructor(inputHTML, name, additionalAttrHTML, settings) {
       super(inputHTML, name, additionalAttrHTML, settings, Style); 
    }

    get beforeClasses(){
        return 'ivx-input-before';
    }

    get afterClasses(){
        return 'ivx-input-after';
    }
    
    get submitButtonHTML() {        
        let {submit = {}, beforeClasses : defaultBeforeClasses, afterClasses : defaultAfterClasses} = this;
        let {label: submitLabel = "Submit", labelHTML: submitLabelHTML, input: submitInput = {}, container: submitContainer = {}, attributes = '', beforeHtml : beforeSettings = {}, afterHtml : afterSettings = {}} = submit;
        let {classes: submitInputClasses = ""} = submitInput;
        let {classes: submitContainerClasses = ""} = submitContainer;

        submitLabel = submitLabelHTML ? submitLabelHTML : submitLabel;

        const {html : beforeHtml = "", classes : beforeClasses = ""} = beforeSettings;
        const {html : afterHtml = "", classes : afterClasses = ""} = afterSettings;

        let submitHTML = submitLabel.length >= 0 ?
            `
            <div class="row">
                <div class="col-md-12 ${submitContainerClasses} ivx-input-container ivx-input-submit-button">
                    <div class="${beforeClasses} ${defaultBeforeClasses}">${beforeHtml}</div>
                    <button class="btn ${submitInputClasses}" type='submit'>
                        ${submitLabel}
                    </button>
                    <div class="${afterClasses} ${defaultAfterClasses}">${afterHtml}</div>
                </div>
            </div>
            ` : '';

        return submitHTML;
    }
}