import { Style } from './style.js';
import { Form as DefaultForm } from '../default/form.js';

export class Form extends DefaultForm {
    constructor(inputHTML, name, additionalAttrHTML, settings) {
       super(inputHTML, name, additionalAttrHTML, settings, Style); 
    }
    
    get submitButtonHTML() {        
        let {submit = {}} = this;
        let {label: submitLabel = "Submit", labelHTML: submitLabelHTML, input: submitInput = {}, container: submitContainer = {}, attributes = ''} = submit;
        let {classes: submitInputClasses = ""} = submitInput;
        let {classes: submitContainerClasses = ""} = submitContainer;

        submitLabel = submitLabelHTML ? submitLabelHTML : submitLabel;

        let submitHTML = submitLabel.length >= 0 ?
            `
            <div class="row">
                <div class="col-md-12 ${submitContainerClasses}">
                    <button class="btn ${submitInputClasses}" type='submit'>
                        ${submitLabel}
                    </button>
                </div>
            </div>
            ` : '';

        return submitHTML;
    }
}