import isEmpty from "lodash/isEmpty";

export class Rules {
    constructor(config) {
        this.config = config;
    }

    get stateIdEnums() {
        let { states = [] } = this.config;

        let stateIds = states.reduce((stateIds, state, index) => {
            const { id: currentStateId, embeddedViews = [] } = state;

            stateIds = [].concat(stateIds, [currentStateId]);

            if (!isEmpty(embeddedViews)) {
                embeddedViews.forEach(embeddedView => {
                    const { states: embeddedStates } = embeddedView;
                    const allParentChildStateIds = embeddedStates.map(embeddedState => {
                        return `${currentStateId}.${embeddedState.stateId}`;
                    });

                    stateIds = [].concat(stateIds, allParentChildStateIds);
                });
            }

            return stateIds;
        }, []);

        return stateIds;
    }

    get rulesRequired() {
        // return ["key", "is", "value"];
    }

    get schema() {
        return {
            "type": "object",
            "name": "Rule Schema",
            "properties": {
                "stateId": {
                    "type": "string"
                },
                "rules": {
                    "type": "array"
                },
                "rule": {
                    "type": "object",
                    "properties": {
                        "key": {
                            "type": "string",
                            "minLength": 1
                        },
                        "is": {
                            "type": "string",
                            "enum": ["lt", "lte", "gt", "gte", "equals", "notEquals"]
                        },
                        "value": {
                            "type": ["string", "number", "boolean", "object", "array"]
                        }
                    },
                    "required": this.rulesRequired
                }
            }
        }

    }

}