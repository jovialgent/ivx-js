export class HTMLObject{
    constructor(){
        
    }

    get generalHTMLSchema(){
        return {
            "type" : "object",
            "properties" : {
                "html" :{
                    "type" : "string"
                },
                "classes" : {
                    "type" : "string"
                },
                "templateUrl" :{
                    "type" : "string"
                }
            }
        }
    }

    get labelHTMLSchema(){

    }
}