export class Rules {
    constructor(config){
        this.config = config;      
    }

    get stateIdEnums(){
        let {states = []} = this.config;

        let stateIds = states.map((state, index) =>{
            return state.id;
        })

        return stateIds;

    }

    get rulesRequired(){
        return ["key", "is", "value"];
    }

    get schema(){
        return {
            "type" : "object",
            "name" : "Rule Schema",
            "properties": {
                "stateId" : {
                    "type" : "string",
                    "enum" : this.stateIdEnums
                },
                "rule" : {
                    "type" : "object",
                    "properties" : {
                        "key" : {
                            "type" : "string",
                             "minLength"  :1
                        },
                        "is" : {
                            "type" : "string",
                            "enum" : ["lt", "lte", "gt", "gte", "equals", "notEquals"]
                        },
                        "value" :{
                            "type" : ["string", "number", "boolean", "object", "array"]
                        }
                    },
                    "required" : this.rulesRequired
                }
            },
             "required" : ["stateId"]
        }

    }

}