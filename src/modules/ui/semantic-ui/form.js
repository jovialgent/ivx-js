import { Style } from './style.js';
import { Form as DefaultForm } from '../default/form.js';

export class Form extends DefaultForm {
    constructor(inputHTML, name, additionalAttrHTML, settings) {
       super(inputHTML, name, additionalAttrHTML, settings, Style);
       
    }
    
    get formClasses(){
        return 'ui form error';
    }

    get submitButtonHTML() {
        let {submit = {}, beforeClasses : defaultBeforeClasses, afterClasses : defaultAfterClasses} = this;
        let {beforeHtml : beforeSettings = {}, afterHtml : afterSettings = {}, label: submitLabel = "Submit", labelHTML: submitLabelHTML, input: submitInput = {}, container: submitContainer = {}, attributes = ''} = submit;
        let {classes: submitInputClasses = ""} = submitInput;
        let {classes: submitContainerClasses = ""} = submitContainer;

        const {html : beforeHtml = "", classes : beforeClasses = ""} = beforeSettings;
        const {html : afterHtml = "", classes : afterClasses = ""} = afterSettings;


        submitLabel = submitLabelHTML ? submitLabelHTML : submitLabel;

        let submitHTML = submitLabel.length >= 0 ?
            `<div class="sixteen field wide ${submitContainerClasses} ivx-input-container ivx-input-submit-button">
                <div class="${beforeClasses} ${defaultBeforeClasses}">${beforeHtml}</div>
                <button class="ui button ${submitInputClasses}" type='submit'>
                    ${submitLabel}
                </button>
                <div class="${afterClasses} ${defaultAfterClasses}">${afterHtml}</div>
            </div>` : '';

        return submitHTML;
    }
};