import { Rules } from './rules.js';
import { HTMLObject } from './html-object';
import EmbeddedViewsSchema from "./states.embedded";

export class States {
    constructor(config) {
        this.rulesSchema = new Rules(config).schema;
        this.generalHTMLSchema = new HTMLObject().generalHTMLSchema;
        this.embeddedViewsSchema = new EmbeddedViewsSchema().shcema;

    }

    get stateRequired() {
        return ['id', 'name', 'url', 'type']
    }

    get typeEnum() {
        return ["navigation", "video", "input", "html"];
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
            "url": {
                "type": "string",
                "pattern": "\/^(\/[A-Za-z0-9-]*)$\/",
                "minLength": 1
            },
            "audio": {
                "type": "object",
                "properties": {
                    "src": {
                        "type": "string",
                        "minLength": 1
                    },
                    "loop": {
                        "type": "boolean"
                    },
                    "cuePoints": {
                        "type": "array"
                    }
                },
                "required": ["src"]
            },
            "type": {
                "type": "string",
                "enum": this.typeEnum
            },
            "next": {
                "type": "array",
                "items": this.rulesSchema
            },
            "onEnter": {
                "type": "array"
            },
            "onExit": {
                "type": "array"
            },
            "embedded": {
                type: "boolean"
            },
            "header": this.generalHTMLSchema,
            "footer": this.generalHTMLSchema,
            "embeddedViews": {
                "type": "array",
                "items": this.embeddedViewsSchema
            },
            "oneOf": [{
                "required": ["embedded"]
            }, {
                "required": ["embeddedViews"]
            }]
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