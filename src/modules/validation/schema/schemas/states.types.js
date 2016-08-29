import {HTMLStateSchema} from './states.types.html.js';
import {VideoStateSchema} from "./states.types.video.js";
import {InputStateSchema} from "./states.types.input.js";
import {NavigationStateSchema} from "./states.types.navigation.js";



export class StatesTypes{
    constructor(states){
        this.states = states;
    }


    validate(){
        let {states, typesSchemas} = this;

        let errorCollection = states.reduce((errors, state, index) =>{
            let {type} = state;
          
            if(type && typesSchemas[type]){
               
                let {errors : typeErrors} = new typesSchemas[type](state, index).validate();
                
                typeErrors.forEach((typeError, errorIndex) =>{
                    let modTypeError = typeError;
                    
                    modTypeError.dataPath = `states/${index}${modTypeError.dataPath.length > 0 ? modTypeError.dataPath : ''}`;

                    errors.push(typeError);

                });

            }

            return errors;
        }, []);

        return errorCollection;

    }

    get typesSchemas(){
        return {
            "html" : HTMLStateSchema,
            "video" : VideoStateSchema,
            "input" : InputStateSchema,
            "navigation" : NavigationStateSchema
        }
    }
}