import {Validation} from './validation.js';
import {ConfigStatesValidation} from './config.states.js';

export class ConfigValidation extends Validation{
    
    constructor(config = {}){
        super();
        this.config = config;     
    }
    
    get validationArray() {
        return [
            this.hasStatesObj,
            this.hasDefaultStateObj,
            this.validDefaultStateObj,
            this.validStateConfig
        ];
    }
    
    get validStateConfig(){
        let {valid, errors} = new ConfigStatesValidation(this.config.states);
        
        if(!valid){
            this.addErrors(errors);
        }
        
        return {
            valid : valid,
            error: {
                type : 'invalid',
                path : 'config.states',
                message : "Experience requires that all states are valid"
            }
        }
        
    }
    
    get validDefaultStateObj(){
         let {valid} = this.hasDefaultStateObj;
         
         if(!valid) return;
         
         let {defaultState} = this.config;
         let finalIndex = defaultState.length - 1;
         let lastState = defaultState[finalIndex];
         
         return {
             valid : lastState.stateId && lastState.stateId.length >= 0,
             error : {
                 "type" : "missing",
                 "path" : `config.defaultState[${finalIndex}].stateId`
             }
         }
         
    }
    
    get hasDefaultStateObj(){
        let {defaultState = []} = this.config;
        let defaultStateExists = typeof defaultState !=='undefined' && defaultState.length >= 1;
        
        
        return {
            valid : defaultStateExists,
            error:{
                "type" : "missing",
                "path" : "config.defaultState"
            },
            data: defaultState
        }
    }
    
    get hasStatesObj(){
        let {states} = this.config;
        
        return {
            valid : typeof states !== 'undefined' && states.length >= 1,
            error : {
                "type" : "missing",
                "path" : "config.states"
            },
            data : states
        }
    }
    
};