import { ObjectParsers, TypeValidator } from '../../../utilities/type-parsers.js';
import {Validation} from './validation.js';

let objectParsers = new ObjectParsers()
let typeValidator = new TypeValidator()

export class ConfigStatesValidation extends Validation {

    constructor(states = []) {
        super();
        this.states = states;
    }

    get validationArray() {
        return [
            this.uniqueValidStateData,
            this.filledValidStateData
        ]
    }

    convertToConfigErrorObjs(errors, errorType) {
        return errors.map((error) => {
            let {key, value, index} = error;
            let errorObject = {
                type : errorType,
                path : `config.states[${index}].${key}`
            };
            
            if(errorType === 'duplicate') errorObject.message =  `Duplicate value: ${value}`;
            
            return {
                valid: false,
                error: errorObject
            }
        });
    }
    
    get filledValidStateData(){
        let {errors = [], isEmpty} = objectParsers.anyEmpty(this.states, ['id', 'url', 'type']);
        
        if (isEmpty) {

            this.addErrors(this.convertToConfigErrorObjs(errors, 'missing'));

        }

        return {
            valid: !isEmpty,
            error: {
                path: 'config.states',
                message: 'Not all state\'s have an id, url, and/or type',
                type: 'invalid'

            },
            data: this.states

        }
    }

    get uniqueValidStateData() {

        let {errors = [], isUnique: valid } = objectParsers.isUnique(this.states, ['id', 'url']);

        if (!valid) {

            this.addErrors(this.convertToConfigErrorObjs(errors, 'duplicate'));

        }

        return {
            valid: valid,
            error: {
                path: 'config.states',
                message: 'Not all state\'s ids and urls are unique',
                type: 'invalid'

            },
            data: this.states

        }

    }

};