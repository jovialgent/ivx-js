export class InputValidatorMocks {
    constructor() {
       
    }

    get mockData() {
        let {story, json} = this;
        return {
            story,
            json
        }
    }

    get json() {
        return {
            "defaultState": [
                {
                    "stateId": "input-state-test"
                }
            ],
            "states": [
                {
                    "id": "input-state-test",
                    "name": "Input Validation Test",
                    "url": "/input-state-test",
                    "type": "input",
                    "header": {},
                    "footer": {},
                    "onEnter": [],
                    "onExit": [],
                    "onSubmit": [],
                    "form": {
                        "classes": "",
                        "submit": {}
                    },
                    "next": [],
                    "inputs": [
                        {
                            "id": "text-short-test",
                            "name": "textshorttest",
                            "type": "text",
                            "settings": {
                                "container": {},
                                "input": {}
                            },
                            "attributes": {
                                "placeholder": "Should have max length of 64 characters..."
                            }
                        },
                        {
                            "id": "text-short-attribute-test",
                            "name": "textshortattribu",
                            "type": "text",
                            "settings": {
                                "container": {},
                                "input": {}
                            },
                            "attributes": {
                                "placeholder": "Should have min length of 5 characters and max length of 10 characters..."
                            }
                        },
                        {
                            "id": "text-medium-test",
                            "name": "textmediumtest",
                            "type": "text",
                            "settings": {
                                "container": {},
                                "input": {}
                            },
                            "attributes": {
                                "placeholder": "Should have max length of 128 characters..."
                            }
                        },
                        {
                            "id": "text-medium-attribute-test",
                            "name": "textmediumattrib",
                            "type": "text",
                            "settings": {
                                "container": {},
                                "input": {}
                            },
                            "attributes": {
                                "placeholder": "Should have min length of 10 and max length of 45 characters..."
                            }
                        },
                        {
                            "id": "text-large-test",
                            "name": "textlargetest",
                            "type": "text",
                            "settings": {
                                "container": {},
                                "input": {}
                            },
                            "attributes": {
                                "placeholder": "Should have max length of 256 characters..."
                            }
                        },
                        {
                            "id": "text-large-attribute-test",
                            "name": "textlargeattribu",
                            "type": "text",
                            "settings": {
                                "container": {},
                                "input": {}
                            },
                            "attributes": {
                                "placeholder": "Should have min length of 20 and max length of 90 characters..."
                            }
                        },
                        {
                            "id": "textarea-test",
                            "name": "textareatest",
                            "type": "text",
                            "settings": {
                                "container": {},
                                "input": {}
                            },
                            "attributes": {
                                "placeholder": "Should be a textarea not a text box..."
                            }
                        },
                        {
                            "id": "number-test",
                            "name": "numbertest",
                            "type": "text",
                            "settings": {
                                "container": {},
                                "input": {}
                            },
                            "attributes": {
                                "placeholder": "Should be a number with a min number of -100 and max number of 100..."
                            }
                        },
                        {
                            "id": "email-test",
                            "name": "emailtest",
                            "type": "text",
                            "settings": {
                                "container": {},
                                "input": {}
                            },
                            "attributes": {
                                "placeholder": "Should validate to email format..."
                            }
                        },
                        {
                            "id": "url-test",
                            "name": "urltest",
                            "type": "text",
                            "settings": {
                                "container": {},
                                "input": {}
                            },
                            "attributes": {
                                "placeholder": "Should validate to url..."
                            }
                        },
                        {
                            "id": "checkbox-test",
                            "name": "checkboxtest",
                            "type": "text",
                            "settings": {
                                "container": {},
                                "input": {}
                            },
                            "attributes": {
                                "placeholder": "Should be a checkbox..."
                            }
                        },
                        {
                            "id": "options-test",
                            "name": "optionstest",
                            "type": "text",
                            "settings": {
                                "container": {},
                                "input": {}
                            },
                            "attributes": {
                                "placeholder": "Should be an options input...",
                                "defaultDisplay": "Should be an options input..."
                            },
                            "options" : [{
                                "value" : "option4",
                                "display" : "Option 4"
                            }]
                        }
                    ]
                }
            ]
        }
    }

    get story() {
        return {
            "name": {
                "name": "Name",
                "description": null,
                "source": "Contact",
                "type": "String",
                "display": "TextMedium",
                "options": [],
                "value": "",
                "attributes": {},
                "key": "name",
                "$$hashKey": "008"
            },
            "email": {
                "name": "Email",
                "description": null,
                "source": "Contact",
                "type": "String",
                "display": "Email",
                "options": [],
                "value": "",
                "attributes": {},
                "key": "email",
                "$$hashKey": "009"
            },
            "textshorttest": {
                "name": "Text Short Test",
                "description": null,
                "source": "Experience",
                "type": "String",
                "display": "TextShort",
                "options": [],
                "value": "",
                "attributes": {},
                "key": "textshorttest",
                "$$hashKey": "00A"
            },
            "textmediumtest": {
                "name": "Text Medium Test",
                "description": null,
                "source": "Experience",
                "type": "String",
                "display": "TextMedium",
                "options": [],
                "value": "",
                "attributes": {},
                "key": "textmediumtest",
                "$$hashKey": "00B"
            },
            "textlargetest": {
                "name": "Text Large Test",
                "description": null,
                "source": "Experience",
                "type": "String",
                "display": "TextLarge",
                "options": [],
                "value": "",
                "attributes": {},
                "key": "textlargetest",
                "$$hashKey": "00C"
            },
            "textareatest": {
                "name": "Textarea Test",
                "description": null,
                "source": "Experience",
                "type": "String",
                "display": "TextArea",
                "options": [],
                "value": "",
                "attributes": {},
                "key": "textareatest",
                "$$hashKey": "00D"
            },
            "numbertest": {
                "name": "Number Test",
                "description": null,
                "source": "Experience",
                "type": "Number",
                "display": "Number",
                "options": [],
                "value": 0,
                "attributes": {
                    "min": "-100",
                    "max": "100"
                },
                "key": "numbertest",
                "$$hashKey": "00E"
            },
            "urltest": {
                "name": "Url Test",
                "description": null,
                "source": "Experience",
                "type": "String",
                "display": "Url",
                "options": [],
                "value": "",
                "attributes": {},
                "key": "urltest",
                "$$hashKey": "00F"
            },
            "optionstest": {
                "name": "Options Test",
                "description": null,
                "source": "Experience",
                "type": "String",
                "display": "Options",
                "options": [
                    {
                        "value": "option1",
                        "display": "Option 1"
                    },
                    {
                        "value": "option2",
                        "display": "Option 2"
                    },
                    {
                        "value": "option3",
                        "display": "Option 3"
                    }
                ],
                "value": "",
                "attributes": {},
                "key": "optionstest",
                "$$hashKey": "00G"
            },
            "emailtest": {
                "name": "Email Test",
                "description": null,
                "source": "Experience",
                "type": "String",
                "display": "Email",
                "options": [],
                "value": "",
                "attributes": {},
                "key": "emailtest",
                "$$hashKey": "00H"
            },
            "checkboxtest": {
                "name": "Checkbox Test",
                "description": null,
                "source": "Experience",
                "type": "Boolean",
                "display": "Checkbox",
                "options": [],
                "value": false,
                "attributes": {},
                "key": "checkboxtest",
                "$$hashKey": "00I"
            },
            "textshortattribu": {
                "name": "Text Short Attribute Test",
                "description": null,
                "source": "Experience",
                "type": "String",
                "display": "TextShort",
                "options": [],
                "value": "",
                "attributes": {
                    "minlength": "5",
                    "maxlength": "10"
                },
                "key": "textshortattribu",
                "$$hashKey": "00J"
            },
            "textmediumattrib": {
                "name": "Text Medium Attribute Test",
                "description": null,
                "source": "Experience",
                "type": "String",
                "display": "TextMedium",
                "options": [],
                "value": "",
                "attributes": {
                    "minlength": "10",
                    "maxlength": "45"
                },
                "key": "textmediumattrib",
                "$$hashKey": "00K"
            },
            "textlargeattribu": {
                "name": "Text Large Attribute Test",
                "description": null,
                "source": "Experience",
                "type": "String",
                "display": "TextLarge",
                "options": [],
                "value": "",
                "attributes": {
                    "minlength": "20",
                    "maxlength": "90"
                },
                "key": "textlargeattribu",
                "$$hashKey": "00L"
            }
        }
    }
}