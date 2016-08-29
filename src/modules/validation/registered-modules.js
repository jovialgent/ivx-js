import {SchemaValidation} from './schema/index.js';
import {iVXjsValidation} from './ivx-js-validation/index.js';

export class RegisteredValidationModules {
    constructor(){
        this.schema  = SchemaValidation;
        this.iVXjsValidation = iVXjsValidation;
    }
};