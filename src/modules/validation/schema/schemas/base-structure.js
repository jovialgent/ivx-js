import {Rules} from './rules.js'; 
import {States} from './states.js';

export class BaseStructure {
    constructor(config){
        this.config = config;
        this.rulesSchema = new Rules(config).schema;
        this.stateSchema = new States(config).schema;

       
    }

    validate(){
        
        return tv4.validateMultiple(this.config, this.schema);
    }

    get schema(){
        return this.baseStructure
    }

    get baseStructure(){
        return {
            type : "object",
            properties: this.properties,
            required : this.requiredKeys
        }
    }

    get properties(){
        return {
            "defaultState" : {
                "type" : "array",
                "items" : this.rulesSchema
            },
            "states" : {
                "type" : "array",
                "items" : this.stateSchema,
                "minItems" : "1"
            }
        }
    }

    get requiredKeys(){
        return ["defaultState", "states"]
    }


}