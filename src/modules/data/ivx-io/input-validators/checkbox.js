import Buttons from "./checkbox.buttons.js";

export default class{
    constructor(jsonInputData, storyInputData = {}){
        this.jsonInputData = Object.assign({}, jsonInputData);
        this.storyInputData = Object.assign({}, storyInputData);
    }

    get input(){
        let {jsonInputData, storyInputData} = this;
        let {type} = jsonInputData;

         if(type === "buttons"){
            return new Buttons(jsonInputData, storyInputData).input;
        } 
        
        jsonInputData.type = "checkbox";

        return jsonInputData;
    }
}