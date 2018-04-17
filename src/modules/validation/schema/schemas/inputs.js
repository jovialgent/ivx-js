export class InputErrors {
    constructor(inputs, currentState) {
        this.inputs = inputs;
        this.currentState = currentState;
    }

    validate() {
        let {inputs, inputSchemas} = this;
        let allInputErrors = inputs.reduce((inputErrors, input, index) => {
            let {type} = input;

            if (type && inputSchemas[type]) {
                let errors = tv4.validateMultiple(input, inputSchemas[type]).errors;
                errors.forEach((thisInputError, errorIndex) => {
                    thisInputError.dataPath = `/inputs/${index}${thisInputError.dataPath.length > 0 ? thisInputError.dataPath : ''}`;
                    inputErrors.push(thisInputError);
                });
            }

            return inputErrors;

        }, []);

        return allInputErrors;
    }

    get inputSchemas() {
        return {
            buttons: this.buttonsSchema,
            checkbox: this.checkboxSchema,
            date: this.dateSchema,
            "datetime-local": this.datetimeLocalSchema,
            email: this.textSchema,
            number: this.numberSchema,
            options: this.optionsSchema,
            radio: this.radioSchema,
            text: this.textSchema,
            textarea: this.textSchema,
            url: this.textSchema

        }
    }

    get buttonsSchema() {
        return {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": ["buttons"]
                },
                "settings": {
                    "type": "object",
                    "properties": {
                        "showLabel": {
                            "type": "boolean"
                        }
                    }
                },
                "buttons": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {

                            "label": {
                                "type": "string"
                            },
                            "labelHTML": {
                                "type": "string"
                            },
                            "labelTemplateUrl": {
                                "type": "string"
                            },
                            "classes": {
                                "type": "string"
                            },
                            "onClick": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "eventName": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        },
                        "required": ["value"]
                    },
                    "minItems": 1
                }
            }
        }
    }

    get checkboxSchema() {
        return {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": ["checkbox"]
                }
            }
        }
    }

    get dateSchema() {
        return {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": ["date"]
                },
                "attributes": {
                    "type": "object",
                    "properties": {
                        "min": {
                            "type": "string",
                            "pattern": "/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/"
                        },
                        "max": {
                            "type": "string",
                            "pattern": "/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/"
                        }
                    }
                }
            }
        }
    }

    get datetimeLocalSchema() {
        return {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": ["datetime-local"]
                },
                "attributes": {
                    "type": "object",
                    "properties": {
                        "min": {
                            "type": "string",
                            "pattern": "/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/"
                        },
                        "max": {
                            "type": "string",
                            "pattern": "/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/"
                        }
                    }
                }
            }
        }
    }

    get numberSchema() {
        return {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": ["number"]
                },
                "attributes": {
                    "type": "object",
                    "properties": {
                        "placeholder": {
                            "type": "string"
                        },
                        "min": {
                            "type": "number"
                        },
                        "max": {
                            "type": "number"
                        },
                        "step": {
                            "type": "number",
                            "minimum": 0,
                            "exclusiveMinimum": true
                        }
                    }
                }
            }
        }
    }

    get optionsSchema() {
        return {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": ["options"]
                },
                "defaultDisplay": {
                    "type": "string"
                },
                "options": {
                    "type": "array",
                    "minItems": 2,
                    "items": {
                        "type": "object",
                        "properties": {
                            "value": {
                                "type": "string",
                                "minLength": 1
                            },
                            "display": {
                                "type": "string",
                                "minLength": 1
                            }
                        },
                        "required": ["value", "display"]
                    }
                }
            }
        }
    }

    get radioSchema() {
        return {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": ["radio"]
                },
                "radioButtons": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "value": {
                                "type": "string",
                                "minLength": 1
                            },
                            "label" : {
                                "type": "string",
                                "minLength": 1
                            },
                            "labelHTML" : {
                                "type": "string",
                                "minLength": 1
                            },
                            "labelTemplateUrl" : {
                                "type": "string",
                                "minLength": 1
                            },
                            "classes" : {
                                "type" : "string"
                            }
                        },
                        "required" : ["value"],
                        "oneOf" : [{
                            "required" : ["label"]
                        },{
                            "required" : ["labelHTML"]
                        },{
                            "required" : ["labelTemplateUrl"]
                        }]
                    },
                    "minItems": 2
                }
            }
        }
    }

    get textSchema() {
        return {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": ["text", "email", "url", "textarea"]
                }
            }

        }
    }



}
