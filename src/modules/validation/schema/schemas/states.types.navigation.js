export class NavigationStateSchema{
    constructor(state, index){
        this.state = state;
        this.index = index;
    }

    validate() {
        return tv4.validateMultiple(this.state, this.schema);
    }

    get schema(){
        return {
            "type" : "object",
            "properties" : {
                "links" : {
                    "type" : "array",
                    "minItems" : 1,
                    "items" : {
                        "type" : "object",
                        "properties" : {
                            "href" : {
                                "type" : "string"
                            },
                            "label" : {
                                "type" : "string"
                            },
                            "labelHTML" : {
                                "type" : "string"
                            },
                            "labelTemplateUrl" : {
                                "type" : "string"
                            },
                            "attributes" : {
                                "type" : "object",
                                "properties" : {
                                    "target" : {
                                        "type" : "string",
                                        "enum" : ["_blank"]
                                    }
                                }
                            },
                            "onClick" : {
                                "type" : "array"
                            }
                        },
                       
                    }
                }
            },
            "required" : ["links"]
        }
    }
}