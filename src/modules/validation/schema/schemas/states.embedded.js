import { Rules } from './rules.js';
import { HTMLObject } from './html-object';

export default class States {
    constructor(config) {
        this.rulesSchema = new Rules(config).schema;
        this.generalHTMLSchema = new HTMLObject().generalHTMLSchema;
        this.config = config;

    }

    get stateRequired() {
        return ['id', 'name', 'appendTo', 'type']
    }

    get stateIdEnums() {
        return config.states.map(state => {
            return state.id;
        })
    }

    get stateProperties() {
        return {
            "id": {
                "type": "string",
                "minLength": 1
            },
            "name": {
                "type": "string",
                "minLength": 1
            },
            "type": {
                "type": "string",
                "enum": ["inline"]
            },
            "appendTo": {
                "type": "string"
            },
            "states": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties" : {
                        
                    }
                }
            }
        }
    }

    get schema() {
        return {
            "type": "object",
            "name": "state",
            "properties": this.stateProperties,
            "required": this.stateRequired
        }
    }
}