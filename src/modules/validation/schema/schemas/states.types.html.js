export class HTMLStateSchema {
    constructor(state) {
        this.state = state;
    }

    validate() {
        return tv4.validateMultiple(this.state, this.schema);
    }

    get requiredProperties() {
        return ["html"]
    }

    get schema() {
        return {
            "type": "object",
            "properties": {
                "html": {
                    "type": "string"
                },
                "templateUrl": {
                    "type": "string"
                },
                "timeoutInMs": {
                    "type": "number"
                }
            },
            "oneOf": [{
                "required": ["html"]
            }, {
                "required": ["templateUrl"]
            }]
        }
    }

}