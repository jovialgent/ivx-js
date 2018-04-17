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
        let {submit = {}} = this;
        let {label: submitLabel = "Submit", labelHTML: submitLabelHTML, input: submitInput = {}, container: submitContainer = {}, attributes = ''} = submit;
        let {classes: submitInputClasses = ""} = submitInput;
        let {classes: submitContainerClasses = ""} = submitContainer;

        submitLabel = submitLabelHTML ? submitLabelHTML : submitLabel;

        let submitHTML = submitLabel.length >= 0 ?
            `<div class="sixteen field wide ${submitContainerClasses}">
                    <button class="ui button ${submitInputClasses}" type='submit'>
                        ${submitLabel}
                    </button>
                </div>` : '';

        return submitHTML;
    }
};