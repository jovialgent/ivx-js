import { Rules } from './rules.js';
import { HTMLObject } from './html-object';

export default class States {
    constructor(config) {
        Object.assign(this, {
            generalHTMLSchema: new HTMLObject().generalHTMLSchema,
            rulesSchema: new Rules(config).schema,
            config
        });
    }

    get stateRequired() {
        return ['id', 'name', 'appendTo', 'type']
    }

    get types(){
        return ['custom']
    }

    get stateIdEnum() {
        return this.config.states.reduce((stateIds, state) => {
            if (state.embedded) {
                stateIds = [].concat(stateIds, [state.id]);
            }

            return stateIds;
        }, ['^'])
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
                "enum": this.types
            },
            "appendTo": {
                "type": "string"
            },
            "states": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "stateId": {
                            "type": "string",
                            "enum": this.stateIdEnum
                        },
                        "next": {
                            "type": "array",
                            "items": this.rulesSchema
                        }
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