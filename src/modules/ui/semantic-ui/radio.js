import {Radio as DefaultRadio} from '../default/radio.js';
import {ErrorMessages} from "./messages.js";

export class Radio extends DefaultRadio {
    constructor(inputObj) {
        super(inputObj, ErrorMessages);
    }
    
    hasCorrectRadioClass(classes){
        let validRadioClasses = [
            "radio", "toggle", "slider"
        ];
        let hasValidClass = false;
         
        validRadioClasses.forEach((validClass) =>{
            if(hasValidClass) return;            
            hasValidClass = (classes.indexOf(validClass) >= 0);
        });
        
        return hasValidClass;    
    }

    uiRadioButtonContainer(radioHTML, uiClasses) {
        let isValidRadioClass = this.hasCorrectRadioClass(uiClasses);
    
        if(!isValidRadioClass) uiClasses = `${uiClasses} radio`;
        
        return ` 
        <div class="field">
            <div class="ui ${uiClasses} checkbox">
                ${radioHTML}
            </div>
        </div>`;
    }

    get uiClasses() {
        return '';
    }

    renderRadioHTML(attrHTML, label, value) {
        let {input} = this;
        let {id} = input;
        let currentId = `${id}${value.length > 0 ? '-' + value : ''}`;

        return `
          <input type="radio" id="${currentId}" ${attrHTML}>
            <label for="${currentId}">   
                     ${label}
          </label>
          `;
    }
}