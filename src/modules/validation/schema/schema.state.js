import {Schema} from './schema.js';

var JSONValidator = new JSONValidation();

export class BasicStateSchema extends Schema {
    constructor() {
        super();

        this.schema = {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "required": true,
                    "minLength": 1
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "minLength": 1
                },
                "url": {
                    "type": "string",
                    "required": true,
                    "pattern": "^\/[/.a-zA-Z0-9-]+$",
                    "minLength": 1
                }
            }
        }
    }

    validate(stateData) {
    
        var dataValidated = JSONValidator.validate(stateData, this.schema);

        if (dataValidated.ok) {
            return true;
        }
        
        Bus.emit('error', new Error(this.createErrorMessage(dataValidated)));

    }

};