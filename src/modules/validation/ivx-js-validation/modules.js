import {Validation} from './validation.js';
import {TypeValidator} from '../../../utilities/type-parsers.js';

let debug = true;
export class ModuleValidation extends Validation {
    constructor(experience){
        super();
        this.experience = experience;
        this.typeValidator = new TypeValidator();
        
    }
    
    get validationArray(){
        let moduleValidationArray = [
            this.validUIModuleObj      
        ]    
        
        return moduleValidationArray;
    }
        
    get validUIModuleObj(){
        let {ui} = this.experience;
       
        return {
            valid : typeof ui !== 'undefined' && this.typeValidator.isString(ui) &&  ui.length > 0,
            error : {
                "path" : "ui",
                "type" : "missing"
            },
            data : ui
        }
          
    }
      
};