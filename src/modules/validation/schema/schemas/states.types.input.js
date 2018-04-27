import {InputErrors} from './inputs.js';
import {HTMLObject} from './html-object';

export class InputStateSchema {
    constructor(state, index) {
        this.state = state;
        this.index = index;
        this.generalHTMLSchema = new HTMLObject().generalHTMLSchema;

    }

    validate() {
        let allErrors = [tv4.validateMultiple(this.state, this.schema), this.inputErrors]
            .reduce((currentErrors, errorObj, index) => {
                let {errors} = errorObj;
                errors.forEach((error, index) => {
                    currentErrors.push(error);
                });
                return currentErrors;
            }, []);

        return {
            errors: allErrors
        }
    }


    get inputErrors() {
        let {index} = this;
        let {inputs = []} = this.state;
        let currentInputErrors = new InputErrors(inputs, index).validate();

        return {
            errors: currentInputErrors
        }
    }

    get schema() {
        return {
            "type": "object",
            "properties": {
                "form": {
                    "type": "object",
                    "properties": {
                        "classes": {
                            "type": "string"
                        },
                        "label": {
                            "type": "string"
                        },
                        "labelHTML": {
                            "type": "string"
                        },
                        "labelTemplateUrl": {
                            "type": "string"
                        },
                        "submit": {
                            "type": "object",
                            "properties": {
                                "classes": {
                                    "type": "string"
                                },
                                "label": {
                                    "type": "string"
                                },
                                "labelHTML": {
                                    "type": "string"
                                },
                                "labelTemplateUrl": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "onSubmit": {
                    "type": "array",
                    "items": {
                        "type": "object"
                    }
                },
                "inputs": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "type": "string",
                                "minLength": 1
                            },
                            "name": {
                                "type": "string",
                                "minLength": 1
                            },
                            "type": {
                                "type": "string"
                            },
                            "errors": {
                                "type": "object"
                            },
                            "label": {
                                "type": "string"
                            },
                            "labelHTML": {
                                "type": "string"
                            },
                            "labelTemplateUrl": {
                                "type": "string"
                            },
                            "beforeHtml" : this.generalHTMLSchema,
                            "afterHtml" : this.generalHTMLSchema,
                            "settings": {
                                "type": "object",
                                "properties": {
                                    "input": {
                                        "type": "object",
                                        "properties": {
                                            "classes": {
                                                "type": "string"
                                            }
                                        }
                                    },
                                    "container": {
                                        "type": "object",
                                        "properties": {
                                            "classes": {
                                                "type": "string"
                                            }
                                        }
                                    },
                                    "width": {
                                        "type": "string"
                                    }
                                }
                            },
                            "attributes": {
                                "type": "object",
                                "properties": {
                                    "required": {
                                        "type": "boolean"
                                    },
                                    "placeholder": {
                                        "type": "string"
                                    },
                                    "minlength": {
                                        "type": "number"
                                    },
                                    "maxlength": {
                                        "type": "number"
                                    }
                                }
                            },
                            "onChange": {
                                "type": "array",
                                "items": {
                                    "type": "object"
                                }
                            }
                        },
                        "required": ["id", "name", "type"]
                    }
                }
            },
            "required": ["inputs"]
        }
    }



}