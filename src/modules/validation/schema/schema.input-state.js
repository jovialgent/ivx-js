
import {BasicStateSchema}  from './schema.state.js';

var JSONValidator = new JSONValidation();

export class InputStateSchema extends BasicStateSchema {

    constructor() {
        super();

        this.inputSchema = {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "required": true,
                    "minLength": 1
                },
                "type": {
                    "type": "string",
                    "required": true,
                    "minLength": 1
                },
                "buttons": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "value": {
                                "type": ["string", "boolean"],
                                "required": true
                            },
                            "label": {
                                "type": "string"
                            },
                            "labelHTML": {
                                "type": "string"
                            }
                        }
                    }
                },
                "options": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "value": {
                                "type": "string",
                                "required": true,
                                "minLength": 1
                            },
                            "display": {
                                "type": "string",
                                "required": true,
                                "minLength": 1
                            }
                        }
                    }
                },
                "attributes": {
                    "type": "object",
                    "properties": {
                        "minlength": {
                            type: "number"
                        },
                        "maxlength": {
                            type: "number"
                        },
                        "min": {
                            type: "string"
                        },
                        "max": {
                            type: "string"
                        },
                        "required": {
                            type: "boolean"
                        }
                    }
                }
            }
        }

    }

    validate(stateData) {

        let basicValidate = super.validate(stateData);


        let inputValidate = stateData.inputs.reduce((result, input, index) => {

            let dataValidated = JSONValidator.validate(input, this.inputSchema);

            if (dataValidated.ok) {
                return result && true;
            }
            
            
            Bus.emit('error', new Error(this.createErrorMessage(dataValidated, `State:${stateData.id} Value:input[${index}]`)));

            return false;

        }, basicValidate);

        return basicValidate && inputValidate;

    }

};