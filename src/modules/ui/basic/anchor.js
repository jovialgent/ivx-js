import { AttributeTags } from "../utilities/attributes.js";
import { TypeValidator } from '../../../utilities/type-parsers.js';
import { assert } from '../../../utilities/asserts.js';

let typeCheck = new TypeValidator();

export class Anchor {
    constructor(anchorInfo) {   
       this.anchorInfo = anchorInfo;
        
    }
    
    get anchorClasses(){
        return '';
    }
    
    get html() {
        let {anchorClasses} = this;
        let {href = '', classes = '', attributes = {}, label = labelHTML, labelHTML, id=''} = this.anchorInfo; 
        let attributeHTML = new AttributeTags(attributes, Object.keys(attributes)).html;

        if(!labelHTML && !label){
            label = href;
        } 

        return `
             <a id='${id}' class="${classes} ${anchorClasses} ivx-link"  href="${href}" ${attributeHTML} >${labelHTML ? labelHTML : label}</a>           
        `
    }
}
